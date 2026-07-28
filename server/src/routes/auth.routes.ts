import { Router } from "express";
import {
  registerWorker,
  registerEventTeam,
  login,
  refresh,
  logout,
  getCurrentUser,
} from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/register/worker", registerWorker);
router.post("/register/event-team", registerEventTeam);
router.post("/login", login);
router.get("/me", protect, getCurrentUser);
router.post("/refresh", refresh);
router.post("/logout", protect, logout);

export default router;
