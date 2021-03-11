import { Router } from 'express';
import userRoutes from './user.route';
import queryRoutes from './query.route';
import blogRoutes from './blog.route';

const router = Router();

router.use('/user', userRoutes);
router.use('/query', queryRoutes);
router.use('/blog', blogRoutes);

export default router;
