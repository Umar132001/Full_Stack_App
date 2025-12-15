import express from "express";
import * as taskController from "../controllers/task.controller.js";
import auth from "../middlewares/auth.middleware.js"; // your auth middleware

const router = express.Router();

router.use((req, res, next) => {
  console.log("📌 Task Route Hit:", req.method, req.originalUrl);
  next();
});

router.post("/", auth(), taskController.create);
router.get("/:taskId", auth(), taskController.getOne);
router.patch("/:taskId", auth(), taskController.update);
router.post("/:taskId/comment", auth(), taskController.comment);
router.post("/:taskId/checklist", auth(), taskController.addChecklist);

export default router;
