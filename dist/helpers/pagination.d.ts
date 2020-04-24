import { Request, Response, NextFunction } from 'express';
import { AppHttpResponse } from './http.response';
export declare function ApplyPagination(request: Request, response: Response, next: NextFunction, queryToApplyPagination: any): Promise<AppHttpResponse>;
