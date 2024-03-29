import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { UserModel } from '../models/user';


export const AuthMiddleWare = async (req, res: Response, next: NextFunction) => {
    const userRepository = getRepository(UserModel);
    try {
        if (!req.headers.authorization) { throw new Error('Not Token Provided'); }
        const token = req.headers.authorization;
        if (!token) { throw new Error('Not authorized'); }
        const decode: any = verify(token, process.env.JWTSECRET);
        const user = await userRepository.findOne({ email: decode.email });
        if (!user) { throw new Error('Not authorized'); }
        req.user = user;
        next();
    } catch (error) {
        const err = error[0] ? Object.values(error[0].constraints) : [error.message];
        return res.status(401).send({ success: false, error: err });
    }
}