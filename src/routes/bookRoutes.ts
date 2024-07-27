import { Router } from 'express';
import { getList, getBook, saveBook } from '../controllers/bookController';
import { bookSaveMiddleware } from '../middlewares/bookSaveMiddleware';

const router = Router();

router.get('/', getList);

router.get('/:id', getBook);

router.post('/', bookSaveMiddleware, saveBook);

export default router;
