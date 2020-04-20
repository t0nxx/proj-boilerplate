import { NextFunction, Request, Response } from 'express';
import { getRepository, createQueryBuilder } from 'typeorm';
import { AppErrorCode, CustomError } from '../helpers/http.error.response';
import { UserModel } from '../models/user';
import { ApplyPagination } from '../helpers/pagination';
import { OkHttp } from '../helpers/http.response';

export class UserController {

    /**
    * Display All
    */

    async all(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(UserModel);
        const query = createQueryBuilder(UserModel, 'user')
            .select(['user.id', 'user.email']);
        const data = await ApplyPagination(request, response, next, query);
        OkHttp(response, data);
    }

    /**
     * show one
     */

    async showOne(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(UserModel);
        if (!request.params.id || isNaN(parseInt(request.params.id, 10))) {
            throw new CustomError({ message: 'invalid id parameter', status: 400, errCode: AppErrorCode.InvalidType });
        }
        const { password, ...userData } = await userRepository.findOne({ id: parseInt(request.params.id, 10) });
        if (!userData.id) { throw new CustomError({ message: 'provided id not exist', status: 404, errCode: AppErrorCode.RelatedEntityNotFound }); }
        OkHttp(response, { data: { ...userData } });

    }

    /**
     * update one
     */

    async update(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(UserModel);
        const user = await userRepository.findOne({ id: parseInt(request['user'].id, 10) });
        if (!user) { throw new Error('user Not Found'); }
        await userRepository.update({ id: user.id }, request.body);
        OkHttp(response);
    }

    /**
     * delete one
     */
    async delete(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(UserModel);
        const user = await userRepository.findOne({ id: parseInt(request.params.id, 10) });
        if (!user) { throw new Error('user Not Found'); }
        await userRepository.remove(user);
        OkHttp(response);
    }
}
