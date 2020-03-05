import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { UploadToS3 } from '../helpers/awsUploader';
import { User } from '../models/user';
import { transformAndValidate } from 'class-transformer-validator';
import { generateJwtToken } from 'src/helpers/GnerateJwt';
import { hash } from 'bcryptjs';

export class UserController {

    /**
    * Display All
    */

    async all(request: Request, response: Response, next: NextFunction) {

        const userRepository = getRepository(User);
        try {
            const data = await userRepository.find();
            response.status(200).send({ data });
        } catch (error) {
            const err = error[0] ? Object.values(error[0].constraints) : [error.message];
            return response.status(400).send({ success: false, error: err });
        }

    }

    /**
     * Create new One
     */

    async create(request: Request, response: Response, next: NextFunction) {

        const userRepository = getRepository(User);
        try {
            const validateBody = await transformAndValidate(User, request.body);

            const emailExist = await userRepository.findOne({ email: request.body.email });

            if (emailExist) { throw new Error('email already exist'); }
            /* business logic validation */
            const newUser = new User();
            Object.assign(newUser, validateBody);
            newUser.password = await hash(request.body.password, 10);
            const create = await userRepository.save(newUser);

            const token = await generateJwtToken({
                id: create.id,
                email: create.email,
            });
            response.status(200).send({ data: { id: create.id, email: create.email }, token });
        } catch (error) {
            const err = error[0] ? Object.values(error[0].constraints) : [error.message];
            return response.status(400).send({ success: false, error: err });
        }
    }

    /**
     * show one
     */

    async showOne(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(User);
        try {
            const user = await userRepository.findOne({ id: parseInt(request.params.id, 10) });
            if (!user) { throw new Error('user Not Found'); }
            return response.status(200).send({ data: user });
        } catch (error) {
            /**
             * if ther error from class validator , return first object . else message of error
             */
            const err = error[0] ? Object.values(error[0].constraints) : [error.message];
            return response.status(400).send({ success: false, error: err });
        }
    }


    /**
     * update one
     */

    async update(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(User);
        try {
            const user = await userRepository.findOne({ id: parseInt(request['user'].id, 10) });
            if (!user) { throw new Error('user Not Found'); }
            await userRepository.update({ id: user.id }, request.body);
            return response.status(200).send({});
        } catch (error) {
            const err = error[0] ? Object.values(error[0].constraints) : [error.message];
            return response.status(400).send({ success: false, error: err });
        }
    }


    /**
     * delete one
     */
    async delete(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(User);
        try {
            const user = await userRepository.findOne({ id: parseInt(request.params.id, 10) });
            if (!user) { throw new Error('user Not Found'); }
            await userRepository.remove(user);
            return response.status(200).send({});
        } catch (error) {
            const err = error[0] ? Object.values(error[0].constraints) : [error.message];
            return response.status(400).send({ success: false, error: err });
        }
    }
}
