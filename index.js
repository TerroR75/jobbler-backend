import dotenv from 'dotenv';
import express from 'express';
import * as Limiter from './middleware/rateLimiter.js';

dotenv.config();
const app = express();

// ROUTES
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import applRoutes from './routes/appl.js';

// MIDDLEWARES
app.use(express.json());
// app.use(Limiter.general);

// ROUTES
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/appl', applRoutes);

app.listen(process.env.APP_PORT, () => {
  console.log(`Listening to port ${process.env.APP_PORT}`);
});
