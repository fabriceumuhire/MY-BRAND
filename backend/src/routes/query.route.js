import { Router } from 'express';
// import queryValidation from '../validators/query.validator';
import {
  getAll,
  getOne,
  postOne,
} from '../controllers/query.controller';

const router = Router();

router.get('/', getAll);

router.post('/', postOne);

router.get('/:id', getOne);

export default router;
