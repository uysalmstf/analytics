import { body } from 'express-validator';

export const userSaveMiddleware = [
    body('name').isString().withMessage('Name must be a string'),
];