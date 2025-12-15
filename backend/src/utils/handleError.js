import logger from "../config/logger.js"; // Import the logger

// Global error handler
export const handleError = (err, req, res, next) => {
  logger.error(`Error occurred: ${err.message}`, { stack: err.stack }); // Log the error

  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({ success: false, message });
};
