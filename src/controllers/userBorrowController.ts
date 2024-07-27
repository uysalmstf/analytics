import { Book } from '../entities/Book';
import { User } from '../entities/User';
import { UserBorrow } from '../entities/UserBorrow';
import { AppDataSource } from '../ormconfig';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const borrowBook = async (req: Request, res: Response) => {
    
    const user = await AppDataSource.manager.findOne(User, {
        where: { id: parseInt(req.params.user) },
    });

    if (user == null) {
        res.status(404).send('User not found');
    }

    const book = await AppDataSource.manager.findOne(Book, {
        where: { id: parseInt(req.params.book) },
    });

    if (book == null) {
        res.status(404).send('Book not found');
    }

    const user_borrow = await AppDataSource.manager.findOne(UserBorrow, {
        where: { book: {id: parseInt(req.params.book)}, user:{id: parseInt(req.params.user)}  },
    });

    if (user_borrow != null) {
        res.status(404).send('Book Borrow was found');
    }

    const userBorrow = new UserBorrow();

    userBorrow.book = book;
    userBorrow.user = user;
    userBorrow.score = 0;
    userBorrow.status = 0;

    try {
        await AppDataSource.manager.save(userBorrow);
        res.status(200).json(userBorrow);

    } catch (error) {
        console.error(error);
        res.status(500).send('UserBorrow Oluşturma Hatası');
    }
}

export const returnBook = async (req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { score } = req.body;


    const user = await AppDataSource.manager.findOne(User, {
        where: { id: parseInt(req.params.user) },
    });

    if (user == null) {
        res.status(404).send('User not found');
    }

    const book = await AppDataSource.manager.findOne(Book, {
        where: { id: parseInt(req.params.book) },
    });

    if (book == null) {
        res.status(404).send('Book not found');
    }

    const user_borrow = await AppDataSource.manager.findOne(UserBorrow, {
        where: { book: {id: parseInt(req.params.book)}, user:{id: parseInt(req.params.user)}  },
    });

    if (user_borrow == null) {
        res.status(404).send('Book Borrow not found');
    }else {
        
        try {
            user_borrow.score = score;
            user_borrow.status = 1;
            user_borrow.book = book;
            user_borrow.user = user;
    
            await AppDataSource.manager.save(user_borrow);
            res.status(200).json(user_borrow);
    
        } catch (error) {
            console.log(error)
            res.status(500).send("User Borrow Update Error")
        }
    }

    
}