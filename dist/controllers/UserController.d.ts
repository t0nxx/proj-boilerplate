import { NextFunction, Request, Response } from 'express';
export declare class UserController {
    all(request: Request, response: Response, next: NextFunction): Promise<void>;
    showOne(request: Request, response: Response, next: NextFunction): Promise<void>;
    update(request: Request, response: Response, next: NextFunction): Promise<void>;
    delete(request: Request, response: Response, next: NextFunction): Promise<void>;
}
