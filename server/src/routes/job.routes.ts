import { Router } from "express";
import {
  createJob,
  getMyJobs,
  getJobById,
  updateJob,
  deleteJob,
  getAllJobs,
  getAttendanceList,
  markAttendance,
  completeJob,
  rateWorkers,
} from "../controllers/job.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";

const router = Router();

// Event Team Routes
router.post("/", protect, restrictTo("eventTeam"), createJob);

router.get("/my-jobs", protect, restrictTo("eventTeam"), getMyJobs);

router.get("/all", protect, restrictTo("worker", "eventTeam"), getAllJobs);
router.get(
  "/:jobId/attendance",
  protect,
  restrictTo("eventTeam"),
  getAttendanceList,
);
router.patch(
  "/:jobId/attendance",
  protect,
  restrictTo("eventTeam"),
  markAttendance,
);
router.patch("/:jobId/complete", protect, restrictTo("eventTeam"), completeJob);
router.patch("/:jobId/rate", protect, restrictTo("eventTeam"), rateWorkers);
// Keep this LAST among GET routes
router.get("/:id", protect, restrictTo("worker", "eventTeam"), getJobById);

router.put("/:id", protect, restrictTo("eventTeam"), updateJob);

router.delete("/:id", protect, restrictTo("eventTeam"), deleteJob);

export default router;
