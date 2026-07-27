import express from "express";
import { getProfile,updateProfile } from "../controllers/workerProfile.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/profile", protect, restrictTo("worker"), getProfile);
router.put("/profile/update", protect, restrictTo("worker"), updateProfile);

export default router;
