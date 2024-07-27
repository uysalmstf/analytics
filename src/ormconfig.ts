import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Book } from './entities/Book';
import { UserBorrow } from './entities/UserBorrow';
import * as dotenv from 'dotenv';

dotenv.config();

 export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [User, Book, UserBorrow],
    migrations: [],
    subscribers: [],
});
