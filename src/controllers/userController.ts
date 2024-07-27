import { User } from '../entities/User';
import { UserBorrow } from '../entities/UserBorrow';
import { AppDataSource } from '../ormconfig';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';


export const userList = async (req: Request, res: Response) => {

    const users = await AppDataSource.manager.find(User);
    res.json(users);
}

export const getUser = async (req: Request, res: Response) => {

    const user = await AppDataSource.manager.findOne(User, {
        where: { id: parseInt(req.params.id) },
        relations: ["books"],
    });  

    if (user) {
        
        const books_past = await AppDataSource.manager.find(UserBorrow, {
            where: { user: { id: parseInt(req.params.id) }, status: 1 },
            relations: ["book"]
        });

        // Mevcut ödünç alınmış kitapları sorgulama
        const books_present = await AppDataSource.manager.find(UserBorrow, {
            where: { user: { id: parseInt(req.params.id) }, status: 0 },
            relations: ["book"]
        });

        return res.json({
            ...user,
            books: {
                past: books_past.length > 0 ? books_past.map(borrow => borrow.book) : [],
                present: books_present.length > 0 ? books_present.map(borrow => borrow.book) : [],
            }
        });
        
    } else {
        res.status(404).send('User not found');
    }
}

export const saveUser = async (req: Request, res: Response) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    // Kullanıcıyı oluşturma
    const user = new User();
    user.name = name;
    
    // Veritabanına kaydetme
    try {
        await AppDataSource.manager.save(user);
        res.status(200).json(user);

    } catch (error) {
        console.error(error);
        res.status(500).send('User Oluşturma Hatası');
    }

}