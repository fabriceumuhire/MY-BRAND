import { Router } from 'express';
import articleValidation from '../validators/query.validator';

const router = Router();

// router.get('/', getUser);

router.post('/', articleValidation);

// router.post('/login', Authenticate, loginUser);

export default router;
