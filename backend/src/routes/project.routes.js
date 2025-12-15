import express from "express";
import auth from "../middlewares/auth.middleware.js";
import * as projectController from "../controllers/project.controller.js";

const router = express.Router();

router.post("/", auth(), projectController.create);
router.get("/", auth(), projectController.getMyProjects);
router.get("/:projectId", auth(), projectController.getOne);
router.put("/:projectId", auth(), projectController.update);
router.delete("/:projectId", auth(), projectController.remove);

router.post("/:projectId/invite", auth(), projectController.inviteMember);
router.delete(
  "/:projectId/members/:userId",
  auth(),
  projectController.removeMemberController
);

export default router;
