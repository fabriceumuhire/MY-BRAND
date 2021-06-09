import { Router } from 'express';
import { jwtAuthenticate } from '../middlewares/auth.middleware';
import {
  getAll,
  getOne,
  postOne,
  updateOne,
  deleteOne,
} from '../controllers/blog.controller';
import { uploadImage } from '../middlewares/image.middleware';

const router = Router();

router.post('/', jwtAuthenticate, uploadImage, postOne);
router.get('/', getAll);
router.get('/:id', getOne);
router.patch('/:id', jwtAuthenticate, updateOne);
router.delete('/:id', jwtAuthenticate, deleteOne);

export default router;
