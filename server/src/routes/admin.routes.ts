import { Router } from "express";

import { login, getDashboard } from "../controllers/admin.controller";
import { protectAdmin } from "../middleware/admin.middleware";

const router = Router();

router.post("/login", login);
router.get("/dashboard", protectAdmin, getDashboard);

export default router;
