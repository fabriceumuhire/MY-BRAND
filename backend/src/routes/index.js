import { Router } from 'express';
import userRoutes from './user.route';
import queryRoutes from './query.route';

const router = Router();

router.use('/user', userRoutes);
router.use('/query', queryRoutes);

export default router;
