import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

@Entity('user')
export class UserModel {

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

    @Column({ type: 'uuid', default: '123456' })
    reset_token: string;

    // helpers methods
    public async hashPasswordMethod(pass): Promise<string> {
        return await hash(pass, 10);
    }

    public async comparePasswordMethod(pass): Promise<boolean> {
        return await compare(pass, this.password);
    }

    public async generateJwtTokenMethod(args: any): Promise<any> {
        return await sign(args, process.env.JWTSECRET, { expiresIn: '60d' });
    }

}
