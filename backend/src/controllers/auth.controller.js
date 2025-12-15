import catchAsync from "../utils/catchAsync.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js"; // Import User model
import { createUser, getUserById } from "../services/user.service.js";
import { loginWithEmailPassword } from "../services/auth.service.js"; // Import login service
import {
  generateAuthTokens,
  generateEmailVerificationToken,
  generatePasswordResetToken,
} from "../services/token.service.js";
import { sendEmail } from "../utils/sendEmail.js";
import Token from "../models/token.model.js";

// Register user and send verification email
export const register = catchAsync(async (req, res) => {
  const user = await createUser(req.body);
  const tokens = await generateAuthTokens(user);

  // Generate email verification token
  const token = await generateEmailVerificationToken(user._id);

  // Construct the verification link
  const verificationLink = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/verify-email?token=${token}`;

  // Send verification email
  const message = `<p>Click <a href="${verificationLink}">here</a> to verify your email address.</p>`;

  try {
    await sendEmail(user.email, "Email Verification", message);
  } catch (error) {
    console.error("Error sending email:", error);
  }

  res.status(201).json({
    success: true,
    message:
      "User registered successfully. An email has been sent to your inbox. Please verify your email address.",
    user,
    tokens,
  });
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  // Use your existing loginWithEmailPassword helper
  const user = await loginWithEmailPassword(email, password);

  // Block login if email not verified
  if (!user.emailVerified) {
    throw new ApiError(
      401,
      "Please verify your email address before logging in."
    );
  }

  const tokens = await generateAuthTokens(user);

  res.json({
    success: true,
    user,
    tokens,
  });
});

export const verifyEmail = catchAsync(async (req, res) => {
  const { token } = req.query;

  console.log("Received Token:", token);

  const verificationToken = await Token.findOne({
    token,
    type: "emailVerify",
    used: false,
    blacklisted: false, // include this if your schema has it
    expires: { $gt: new Date() }, // just check it's in the future
  });

  console.log("Verification Token:", verificationToken);

  if (!verificationToken) {
    throw new ApiError(400, "Invalid or expired verification link");
  }

  verificationToken.used = true;
  await verificationToken.save();

  const user = await getUserById(verificationToken.user);
  user.emailVerified = true;
  await user.save();

  res.json({
    success: true,
    message: "Email successfully verified",
  });
});

// Forgot password - send reset link
export const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) throw new ApiError(404, "User not found");

  const token = await generatePasswordResetToken(user._id);

  const resetLink = `http://localhost:5173/reset-password?token=${token}`;

  const message = `
    <p>You requested a password reset.</p>
    <p>
      Click <a href="${resetLink}">here</a> to reset your password.
    </p>
  `;

  await sendEmail(user.email, "Password Reset Request", message);

  res.json({
    success: true,
    message: "Password reset link sent to your email",
  });
});

// Reset password using token
export const resetPassword = catchAsync(async (req, res) => {
  const { token, newPassword } = req.body;
  const resetToken = await Token.findOne({
    token,
    type: "passwordReset",
    used: false,
    expires: { $gt: new Date() },
  });

  if (!resetToken) {
    throw new ApiError(400, "Invalid or expired reset link");
  }

  const user = await User.findById(resetToken.user);
  user.password = newPassword; // Make sure password hashing middleware is active on User model
  await user.save();

  resetToken.used = true;
  await resetToken.save();

  res.json({
    success: true,
    message: "Password successfully reset",
  });
});
