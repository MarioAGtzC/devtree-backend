import { Router } from 'express';
import authRoutes from './auth.routes';
import baseRoutes from './base.routes';
import userRoutes from './user.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/', baseRoutes);

export default router;