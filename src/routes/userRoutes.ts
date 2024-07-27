
import { Router } from 'express';
import { userList, getUser, saveUser } from '../controllers/userController';
import { borrowBook, returnBook } from '../controllers/userBorrowController';
import { userSaveMiddleware } from '../middlewares/userSaveMiddleware';
import { returnBorrowMiddleware } from '../middlewares/returnBorrowMiddleware';

const router = Router();

router.get('/', userList);

router.get('/:id', getUser);

router.post('/', userSaveMiddleware, saveUser);

router.post('/:user/borrow/:book', borrowBook);

router.post('/:user/return/:book', returnBorrowMiddleware, returnBook);

export default router;
