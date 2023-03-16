import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const app = express();

// ROUTES
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';

// MIDDLEWARES
app.use(express.json());

// ROUTES
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.listen(process.env.APP_PORT, () => {
  console.log(`Listening to port ${process.env.APP_PORT}`);
});
