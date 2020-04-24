import { NextFunction, Request, Response } from 'express';
export declare class AuthController {
    login(request: Request, response: Response, next: NextFunction): Promise<void>;
    signUp(request: Request, response: Response, next: NextFunction): Promise<void>;
    changePassword(request: Request, response: Response, next: NextFunction): Promise<void>;
}
