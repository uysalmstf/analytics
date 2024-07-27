import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Book } from './Book';

@Entity()
export class UserBorrow {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @ManyToOne(() => User, user => user.id)
    user: User | null = null;

    @ManyToOne(() => Book, book => book.id)
    book: Book | null = null;

    @Column()
    status: number = 0;


    @Column()
    score: number = 0;

}