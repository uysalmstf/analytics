import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { User } from './User';
import { UserBorrow } from './UserBorrow';

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    name: string = "";

    @Column({ type: 'decimal', precision: 2, scale: 1, default: 0 }) // 0-10 arasında bir puan
    averageRating!: number;
    
    @OneToMany(() => User, books => books.book)
    book!: User[];

    @OneToMany(() => UserBorrow, userBorrow => userBorrow.user)
    books!: UserBorrow[];
}