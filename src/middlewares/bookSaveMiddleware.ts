import { body } from 'express-validator';

export const bookSaveMiddleware = [
    body('name').isString().withMessage('Name must be a string'),
];