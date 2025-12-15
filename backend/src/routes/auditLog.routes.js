import express from "express";
import auth from "../middlewares/auth.middleware.js"; // Auth middleware
import * as auditLogController from "../controllers/auditLog.controller.js"; // Audit log controller

const router = express.Router();

// POST /api/v1/activity - Log activity
router.post("/", auth(), auditLogController.log);

// GET /api/v1/activity - Get user activities
router.get("/", auth(), auditLogController.getUserActivities);

export default router;
