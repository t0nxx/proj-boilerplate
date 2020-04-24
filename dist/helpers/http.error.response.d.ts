export interface ErrorParams {
    message: string;
    field?: string;
    errCode?: AppErrorCode;
    status?: number;
}
export interface AppHttpResponseError {
    code?: AppErrorCode;
    field?: string;
    message?: string;
}
export declare enum AppErrorCode {
    UnAuthenticated = 1,
    Forbidden = 2,
    InternalServerError = 3,
    IsRequired = 4,
    InvalidType = 5,
    InvalidLength = 6,
    ValueExists = 7,
    CantBeDeleted = 8,
    RelatedEntityNotFound = 9
}
export declare class CustomError extends Error {
    field: string;
    errCode: AppErrorCode;
    status: number;
    msg: string;
    constructor(params?: ErrorParams);
}
