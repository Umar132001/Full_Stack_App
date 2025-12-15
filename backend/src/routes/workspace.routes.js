import express from "express";
import * as workspaceController from "../controllers/workspace.controller.js";
import auth from "../middlewares/auth.middleware.js"; // Protecting routes

const router = express.Router();

router.post("/", auth(), workspaceController.createWorkspace);

router.get("/:workspaceId", auth(), workspaceController.getWorkspace);

router.post("/:workspaceId/members", auth(), workspaceController.addMember);

export default router;
