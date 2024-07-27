import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Book } from './entities/Book';
import { UserBorrow } from './entities/UserBorrow';

 export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '102030',
    database: 'invent_analytics',
    synchronize: true,
    logging: false,
    entities: [User, Book, UserBorrow],
    migrations: [],
    subscribers: [],
});
