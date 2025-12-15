import express from "express";
import auth from "../middlewares/auth.middleware.js";
import { getMe, getUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", auth(), getMe);
router.get("/", auth(), getUsers);

export default router;
