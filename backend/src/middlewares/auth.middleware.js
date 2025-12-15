import jwt from "jsonwebtoken";
import config from "../config/env.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";
import logger from "../config/logger.js"; // Import the logger

export default function auth() {
  return async (req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
      logger.debug(`Token extracted: ${token}`); // Log token extraction
    }

    if (!token) {
      logger.warn("No token provided"); // Log missing token
      return next(new ApiError(401, "Not authenticated"));
    }

    try {
      const payload = jwt.verify(token, config.jwt.accessSecret);
      logger.debug(`Decoded JWT Payload: ${JSON.stringify(payload)}`); // Log decoded token

      const user = await User.findById(payload.sub);
      if (!user) {
        logger.warn("User not found"); // Log user not found
        return next(new ApiError(401, "User not found"));
      }

      req.user = user;
      logger.info(`User authenticated: ${user._id}`); // Log successful authentication
      next();
    } catch (e) {
      logger.error(`JWT Verification failed: ${e.message}`); // Log JWT verification failure
      next(new ApiError(401, "Invalid or expired token"));
    }
  };
}
