import { NextFunction, Request, Response, RequestHandler } from 'express';
export declare const asyncWrapper: (fn: RequestHandler) => (request: Request, response: Response, next: NextFunction) => Promise<void>;
