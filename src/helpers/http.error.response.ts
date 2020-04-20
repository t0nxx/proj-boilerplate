
export interface ErrorParams {
    message: string;
    field?: string;
    errCode?: AppErrorCode;
    status?: number;
}

export interface AppHttpResponseError {
    /**
    * Gets or sets the application-specific code for this error.
    */
    code?: AppErrorCode;

    /**
     * Gets or sets the name of the source that causes this error.
     * this could help you in multilanguage or if you are using i18n 
     */
    field?: string;

    /**
     * Gets or sets a more descriptive details for the problem, unlike the generic @field title.
     */
    message?: string;
}

export enum AppErrorCode {
    /** Un-authenticated code. */
    UnAuthenticated = 1,

    /** Access denied or forbidden code. */
    Forbidden = 2,

    /** Internal server code. */
    InternalServerError = 3,

    /** The field is required code. */
    IsRequired = 4,

    /** The field type is invalid. */
    InvalidType = 5,

    /** The field type is String and its length is invalid. */
    InvalidLength = 6,

    /** The entity field value already exists in another entity. */
    ValueExists = 7,

    /** The entity can't be deleted due to its existing relations with other entities. */
    CantBeDeleted = 8,

    RelatedEntityNotFound = 9,
}

export class CustomError extends Error {
    field: string;
    errCode: AppErrorCode;
    status: number;
    msg: string;

    constructor(params?: ErrorParams) {
        super(params.message);
        this.msg = params.message || 'Internal Server Error , Please Contact Us .';
        this.errCode = params.errCode || AppErrorCode.InternalServerError;
        this.status = params.status || 500;
        this.field = params.field;
        Error.captureStackTrace(this, CustomError);
    }

}
