import { Request, Response, NextFunction } from 'express';
import { AppHttpResponse } from './http.response';

export async function ApplyPagination(request: Request, response: Response, next: NextFunction, queryToApplyPagination) {
    let pageSize: number = 10;
    let page: number = 1;

    request.query.page ? page = parseInt(request.query.page, 10) : page = 1;
    request.query.pageSize ? pageSize = parseInt(request.query.pageSize, 10) : pageSize = 10;

    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    queryToApplyPagination.take(pageSize);
    queryToApplyPagination.skip(startIndex);

    try {
        const [results, count] = await queryToApplyPagination.getManyAndCount();
        const responseObject: AppHttpResponse = { meta: {} };
        responseObject.data = results;
        responseObject.meta.total = count || 0;
        if (endIndex < count) {
            responseObject.meta.nextPage = `https://${request.get('host')}${request.baseUrl}${request.path}?page=${page + 1}&limit=${pageSize}`;
        }
        return responseObject;

    } catch (error) {
        next(error);
    }
}
