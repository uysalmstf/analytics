import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserBorrow } from './UserBorrow';
import { Book } from './Book';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    name: string = "";

    @OneToMany(() => Book, books => books.book)
    book!: Book[];

    @OneToMany(() => UserBorrow, userBorrow => userBorrow.user)
    books!: UserBorrow[];
}