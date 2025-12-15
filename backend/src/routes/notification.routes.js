import express from "express";
import auth from "../middlewares/auth.middleware.js";
import * as notificationController from "../controllers/notification.controller.js";

const router = express.Router();

router.post("/", auth(), notificationController.create);
router.get("/", auth(), notificationController.getUserNotification);
router.put("/:notificationId", auth(), notificationController.markRead);

export default router;
