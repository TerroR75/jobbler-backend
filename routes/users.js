import express from 'express';
import * as UserController from '../controllers/users.js';

const router = express.Router();

router.get('/all', async (req, res) => {
  const users = await UserController.getAllUsers();
  res.send(users);
});

export default router;
