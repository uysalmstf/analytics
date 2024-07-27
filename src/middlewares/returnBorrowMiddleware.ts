import { body } from 'express-validator';

export const returnBorrowMiddleware = [
    body('score').isInt({min: 1}).withMessage('Score minimum value must be 1'),
];