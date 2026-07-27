import { Router } from "express";
import {
  applyForJob,
  getMyApplications,
  getApplicantsByJob,
  updateApplicationStatus,
} from "../controllers/application.controller";

import { protect, restrictTo } from "../middleware/auth.middleware";

const router = Router();

// Worker
router.post("/:jobId", protect, restrictTo("worker"), applyForJob);

router.get(
  "/my-applications",
  protect,
  restrictTo("worker"),
  getMyApplications,
);

// Event Team
router.get("/job/:jobId", protect, restrictTo("eventTeam"), getApplicantsByJob);

router.patch(
  "/:applicationId/status",
  protect,
  restrictTo("eventTeam"),
  updateApplicationStatus,
);

export default router;
