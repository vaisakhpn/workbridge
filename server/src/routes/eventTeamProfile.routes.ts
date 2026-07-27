import { Router } from "express";
import {
  getProfile,
  updateProfile,
} from "../controllers/eventTeamProfile.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";

const router = Router();

router.get("/profile", protect, restrictTo("eventTeam"), getProfile);

router.put("/profile/update", protect, restrictTo("eventTeam"), updateProfile);

export default router;
