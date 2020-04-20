import { NextFunction, Request, Response, RequestHandler } from 'express'

export const asyncWrapper = (fn: RequestHandler) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        try {
            await fn(request, response, next);
        } catch (error) {
            next(error);
        }
    };
};
