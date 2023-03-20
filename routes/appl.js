import express from 'express';
import * as ApplController from '../controllers/appls.js';
import cookieParser from 'cookie-parser';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.use(cookieParser(), verifyToken);

router.post('/create', ApplController.createNew);
router.get('/all', ApplController.getAllByUserId);

export default router;
