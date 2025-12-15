import express from "express";
import auth from "../middlewares/auth.middleware.js";
import * as reportsController from "../controllers/reports.controller.js";

const router = express.Router();

// Get Burndown Data Tasks with status: "done" + completedAt
router.get("/burndown", auth(), reportsController.getBurndownData);

// Get Team Velocity Data asks with status: "done" + a sprint field
router.get("/velocity", auth(), reportsController.getTeamVelocity);

// Get Workload Analysis Data Any tasks (assigned to someone)
router.get("/workload", auth(), reportsController.getWorkloadData);

// Get Recurring Tasks Data Tasks where recurring !== "none"
router.get("/recurring", auth(), reportsController.getRecurringTasksData);

// Get Time Tracking Data Tasks with totalTrackedTime > 0
router.get("/time-tracking", auth(), reportsController.getTimeTrackingData);

export default router;
