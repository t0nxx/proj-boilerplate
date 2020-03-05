import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { compare, hash } from 'bcryptjs';
import { transformAndValidate } from 'class-transformer-validator';
import * as randomString from 'randomstring';
import { JWTSECRET } from '../config/Secrets';
import { verify } from 'jsonwebtoken';
import { User } from '../models/user';
import { generateJwtToken } from '../helpers/GnerateJwt';
import { sendMail, sendWelcomeMail } from '../helpers/sendMail';

export class AuthController {

    /**
     * @Post
     */
    async login(request: Request, response: Response) {
        const userRepository = getRepository(User);
        try {
            const user = await userRepository.findOne({ email: request.body.email });
            if (!user) { throw new Error('invalid email / password'); }
            const checkPass = await compare(request.body.password, user.password);
            if (!checkPass) { throw new Error('invalid email / password'); }

            const token = await generateJwtToken({
                id: user.id,
                email: user.email,
            });
            return response.status(200).send({ data: user, token });
        } catch (error) {
            const err = error[0] ? Object.values(error[0].constraints) : [error.message];
            return response.status(400).send({ success: false, error: err });
        }
    }



    async signUp(request: Request, response: Response) {
        const userRepository = getRepository(User);
        try {
            const validateBody = await transformAndValidate(User, request.body);

            const emailExist = await userRepository.findOne({ email: request.body.email });

            if (emailExist) { throw new Error('email already exist'); }
            /* business logic validation */
            const newUser = new User();
            Object.assign(newUser, validateBody);
            newUser.password = await hash(request.body.password1, 10);
            const create = await userRepository.save(newUser);

            const token = await generateJwtToken({
                id: create.id,
                email: create.email,
            });
            return response.status(200).send({ token });
        } catch (error) {
            /**
             * if ther error from class validator , return first object . else message of error
             */
            const err = error[0] ? Object.values(error[0].constraints) : [error.message];
            return response.status(400).send({ success: false, error: err });
        }
    }




    async changePassword(request: Request, response: Response) {
        const userRepository = getRepository(User);
        try {
            const user = await userRepository.findOne({ email: request['user'].email });
            if (request.body.old_password !== request.body.new_password) {
                throw new Error('old password are wrong');
            }
            const oldPasswordIsCorrect = await compare(request.body.old_password, user.password);
            if (!oldPasswordIsCorrect) { throw new Error('old password is wrong'); }
            const newPass = await hash(request.body.new_password, 10);
            await userRepository.update({ id: user.id }, { password: newPass });
            return response.status(200).send({ success: true });
        } catch (error) {
            const err = error[0] ? Object.values(error[0].constraints) : [error.message];
            return response.status(400).send({ success: false, error: err });

        }
    }
}