import jwt from "jsonwebtoken";
import Token from "../models/token.model.js";
import config from "../config/env.js";

// Helper to generate JWT tokens
function generateToken(userId, expires, secret) {
  const payload = {
    sub: userId,
    exp: Math.floor(expires.getTime() / 1000),
  };
  return jwt.sign(payload, secret);
}

// Generate Auth tokens (access and refresh)
export async function generateAuthTokens(user) {
  const accessExp = new Date(Date.now() + 15 * 60 * 1000); // 15 mins
  const refreshExp = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  const accessToken = generateToken(
    user.id,
    accessExp,
    config.jwt.accessSecret
  );
  const refreshToken = generateToken(
    user.id,
    refreshExp,
    config.jwt.refreshSecret
  );

  await Token.create({
    token: refreshToken,
    user: user.id,
    type: "refresh",
    expires: refreshExp,
    blacklisted: false,
    used: false,
  });

  return {
    access: { token: accessToken, expires: accessExp },
    refresh: { token: refreshToken, expires: refreshExp },
  };
}

// Generate Email Verification Token
export async function generateEmailVerificationToken(userId) {
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  const token = jwt.sign({ sub: userId }, config.jwt.emailVerifySecret, {
    expiresIn: "1h",
  });

  const doc = await Token.create({
    token,
    user: userId,
    type: "emailVerify",
    expires,
    blacklisted: false,
    used: false,
  });

  console.log("Saved emailVerify token doc:", doc);

  return token;
}

// Generate Password Reset Token
export async function generatePasswordResetToken(userId) {
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  const token = jwt.sign({ sub: userId }, config.jwt.passwordResetSecret, {
    expiresIn: "1h",
  });

  const doc = await Token.create({
    token,
    user: userId,
    type: "passwordReset",
    expires,
    blacklisted: false,
    used: false,
  });

  console.log("Saved passwordReset token doc:", doc);

  return token;
}

// Verify raw JWT with a specific secret
export function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

// Revoke Refresh Token
export async function revokeRefreshToken(token) {
  await Token.updateOne({ token }, { $set: { blacklisted: true, used: true } });
}
