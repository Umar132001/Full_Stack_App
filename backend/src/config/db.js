import mongoose from "mongoose";
import config from "./env.js";
import logger from "./logger.js";

export default async function connectDB() {
  try {
    await mongoose.connect(config.mongoUrl);
    logger.info("MongoDB connected");
  } catch (err) {
    logger.error("MongoDB connection error", err);
    process.exit(1);
  }
}
