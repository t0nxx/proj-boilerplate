import { Column, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty({ message: 'email is required' })
    @IsEmail()
    @Column()
    email: string;

    @IsNotEmpty({ message: 'password is required' })
    @MinLength(6)
    @Column()
    password: string;

}
