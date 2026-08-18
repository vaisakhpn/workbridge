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
import { authRateLimiter } from "../middleware/rateLimit.middleware";

const router = Router();

router.post("/register/worker", authRateLimiter, registerWorker);
router.post("/register/event-team", authRateLimiter, registerEventTeam);
router.post("/login", authRateLimiter, login);
router.get("/me", protect, getCurrentUser);
router.post("/refresh", refresh);
router.post("/logout", protect, logout);

export default router;
