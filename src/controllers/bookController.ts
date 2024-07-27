import { Book } from "../entities/Book";
import { UserBorrow } from '../entities/UserBorrow';
import { AppDataSource } from '../ormconfig';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const getList = async (req: Request, res: Response) => {
    const books = await AppDataSource.manager.find(Book);
    res.json(books);
}

export const getBook = async (req: Request, res: Response) => {
    const book = await AppDataSource.manager.findOneBy(Book, { id: parseInt(req.params.id) });
    if (book) {

        const borrow_books = await AppDataSource.manager.find(UserBorrow, {
            where: { book: { id: parseInt(req.params.id) }, status: 1 },
            relations: ["book"]
        }); 
        
        if (borrow_books.length == 0) {
            book.averageRating = -1;
        }else {

            let avg = 0;

            for (let index = 0; index < borrow_books.length; index++) {
                const element = borrow_books[index];
                
                avg += element.score;
            }

            let avg_last = avg / borrow_books.length;

            book.averageRating = avg_last;
        }

        res.json(book);
    } else {
        res.status(404).send('Book not found');
    }
}

export const saveBook = async (req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { name } = req.body;

    // Kullanıcıyı oluşturma
    const book = new Book();
    book.name = name;
    
    // Veritabanına kaydetme
    try {
        await AppDataSource.manager.save(book);
        res.status(200).json(book);

    } catch (error) {
        console.error(error);
        res.status(500).send('Kitap Oluşturma Hatası');
    }
}