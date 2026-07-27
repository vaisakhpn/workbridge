import { Router } from "express";
import {
  getWorkerDashboard,
  getEventTeamDashboard,
} from "../controllers/dashboard.controller";

import { protect, restrictTo } from "../middleware/auth.middleware";

const router = Router();

router.get("/worker", protect, restrictTo("worker"), getWorkerDashboard);

router.get(
  "/event-team",
  protect,
  restrictTo("eventTeam"),
  getEventTeamDashboard,
);

export default router;
