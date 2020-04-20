import { Response } from 'express'

export interface AppHttpResponse {
    /**
     * Gets or sets the data that requested or created by the user.
     *
     */
    data?: object | any[];

    /**
     * Gets or sets the metadata for the http response.
     */
    meta?: AppHttpResponseMeta;

}

export interface AppHttpResponseMeta {
    /**
     * Gets or sets the current pagination page.
     */
    page?: number;

    /**
     * Gets or sets the maximum allowed items per-page.
     */
    pageSize?: number;

    /**
     * Gets or sets the total count of items available in the database those match the query criteria.
     */
    total?: number;

    /**
     * Gets or sets the number of the next pagination page.
     */
    nextPage?: string;

}

export function OkHttp(response: Response, body?: AppHttpResponse): Response {
    return body ? response.status(200).send(body) : response.status(200).send();
}