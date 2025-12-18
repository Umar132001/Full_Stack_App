import express from "express";
import * as workspaceController from "../controllers/workspace.controller.js";
import auth from "../middlewares/auth.middleware.js"; // Protecting routes

const router = express.Router();

router.post("/", auth(), workspaceController.createWorkspace);
router.get("/", auth(), workspaceController.getWorkspaces);
router.get("/:workspaceId", auth(), workspaceController.getWorkspace);
router.post("/:workspaceId/members", auth(), workspaceController.addMember);
router.delete("/:workspaceId/member", auth(), workspaceController.removeMember);
router.delete("/:workspaceId", auth(), workspaceController.deleteWorkspace);

export default router;
