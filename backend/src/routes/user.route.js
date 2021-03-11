import { Router } from 'express';
import { Authenticate } from '../middlewares/user.middleware';
import {
  getUser,
  registerUser,
  loginUser,
} from '../controllers/user.controller';

const router = Router();

router.get('/', getUser);

router.post('/register', registerUser);

router.post('/login', Authenticate, loginUser);

export default router;
