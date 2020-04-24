import { Response } from 'express';
export interface AppHttpResponse {
    data?: object | any[];
    meta?: AppHttpResponseMeta;
}
export interface AppHttpResponseMeta {
    page?: number;
    pageSize?: number;
    total?: number;
    nextPage?: string;
}
export declare function OkHttp(response: Response, body?: AppHttpResponse): Response;
