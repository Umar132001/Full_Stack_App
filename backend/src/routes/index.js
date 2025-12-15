import express from "express";

import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import projectRoutes from "./project.routes.js";
import taskRoutes from "./task.routes.js";
import workspaceRoutes from "./workspace.routes.js";
import reportRoutes from "./reports.routes.js";
import auditLogRoutes from "./auditLog.routes.js";
import notificationaRoutes from "./notification.routes.js";

const router = express.Router();

// Main API routes
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/projects", projectRoutes);
router.use("/tasks", taskRoutes);
router.use("/workspaces", workspaceRoutes);
router.use("/reports", reportRoutes);
router.use("/activity", auditLogRoutes);
router.use("/notification", notificationaRoutes);

export default router;
