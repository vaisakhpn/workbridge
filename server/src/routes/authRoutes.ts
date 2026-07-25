import { Router } from 'express';
import {
  registerWorker,
  registerEventTeam,
  login,
  refresh,
  logout,
} from '../controllers/authController';

const router = Router();

router.post('/register/worker', registerWorker);
router.post('/register/event-team', registerEventTeam);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);

export default router;
