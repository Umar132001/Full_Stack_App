import express from "express";
import * as taskController from "../controllers/task.controller.js";
import auth from "../middlewares/auth.middleware.js"; // your auth middleware

const router = express.Router();

router.use((req, res, next) => {
  console.log("📌 Task Route Hit:", req.method, req.originalUrl);
  next();
});

// Get tasks for a specific project (using query parameter)
router.get("/", auth(), taskController.getTasksForProject);

router.post("/", auth(), taskController.create);
router.get("/:taskId", auth(), taskController.getOne);
router.patch("/:taskId", auth(), taskController.update);
router.delete("/:taskId", auth(), taskController.deleteTask);
router.post("/:taskId/comment", auth(), taskController.comment);
router.post("/:taskId/checklist", auth(), taskController.addChecklist);

export default router;
