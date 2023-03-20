import express from 'express';
import * as AuthController from '../controllers/auth.js';
import * as Limiter from '../middleware/rateLimiter.js';
import { signupValidation } from '../middleware/signupValidation.js';

const router = express.Router();

router.post('/register', Limiter.createAccountLimiter, signupValidation, AuthController.register);
router.post('/login', AuthController.login);

export default router;
