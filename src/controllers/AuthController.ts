import { transformAndValidate } from 'class-transformer-validator';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { AppErrorCode, CustomError } from '../helpers/http.error.response';
import { AppHttpResponse, OkHttp } from '../helpers/http.response';
import { UserModel } from '../models/user';

export class AuthController {

    /**
     * @Post
     */
    async login(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(UserModel);
        if (!request.body.email || !request.body.password) {
            throw new CustomError({ message: 'email/password are required', status: 400, errCode: AppErrorCode.IsRequired })
        }
        const user = await userRepository.findOne({ email: request.body.email });
        if (!user) {
            throw new CustomError({ message: 'invalid email / password', errCode: AppErrorCode.InvalidType, status: 400 });
        }

        const checkPass = await user.comparePasswordMethod(request.body.password);
        if (!checkPass) { throw new CustomError({ message: 'invalid email / password', status: 400, errCode: AppErrorCode.InvalidType }) }

        const token = await user.generateJwtTokenMethod({ id: user.id, email: user.email });
        const { password, ...returnedData } = user;

        OkHttp(response, { data: { ...returnedData, token } })

    }


    async signUp(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(UserModel);
        // validate request body 
        const validateBody = await transformAndValidate(UserModel, request.body);

        // check if email already existu
        const emailExist = await userRepository.findOne({ email: request.body.email });
        if (emailExist) { throw new CustomError({ message: 'email already exist', status: 400 }); }

        /* business logic validation */
        const newUser = new UserModel();
        Object.assign(newUser, validateBody);

        // hash user password 
        const hashedPass = await newUser.hashPasswordMethod(request.body.password);
        newUser.password = hashedPass;
        // save record to database
        const create = await userRepository.save(newUser);
        console.log(create);


        OkHttp(response, { data: { token: await create.generateJwtTokenMethod({ id: create.id, email: create.email }) } });

    }


    async changePassword(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(UserModel);
        const user = await userRepository.findOne({ email: request['user'].email });

        if (!request.body.old_password) { throw new Error('Old Password Is Required'); }
        if (!request.body.new_password) { throw new Error('New Password Is Required'); }
        // compare old password 
        if (!user.comparePasswordMethod(request.body.old_password)) { throw new Error('old password is wrong'); }
        await user.hashPasswordMethod(request.body.new_password);
        await userRepository.save(user);

        OkHttp(response);
    }
}
