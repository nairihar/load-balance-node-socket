import express from 'express';

import middlewares from './middlewares';
import userRoutes from './user';
import authRoutes from './auth';
import { routes } from '../configs';

const router = express.Router();

router.use(middlewares);

router.use(routes.user.main, userRoutes);
router.use(routes.auth.main, authRoutes);

router.use((req, res) => {
  res.send('Not found').status(404);
});

export default router;
