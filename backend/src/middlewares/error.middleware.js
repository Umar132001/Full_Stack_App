import ApiError from "../utils/ApiError.js";
import logger from "../config/logger.js";

export function errorConverter(err, req, res, next) {
  let converted = err;

  if (!(err instanceof ApiError)) {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    converted = new ApiError(statusCode, message);
  }

  next(converted);
}

export function errorHandler(err, req, res, next) {
  logger.error(err);

  const status = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  res.status(status).json({
    success: false,
    status,
    message,
  });
}
