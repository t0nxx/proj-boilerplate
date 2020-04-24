"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppErrorCode;
(function (AppErrorCode) {
    AppErrorCode[AppErrorCode["UnAuthenticated"] = 1] = "UnAuthenticated";
    AppErrorCode[AppErrorCode["Forbidden"] = 2] = "Forbidden";
    AppErrorCode[AppErrorCode["InternalServerError"] = 3] = "InternalServerError";
    AppErrorCode[AppErrorCode["IsRequired"] = 4] = "IsRequired";
    AppErrorCode[AppErrorCode["InvalidType"] = 5] = "InvalidType";
    AppErrorCode[AppErrorCode["InvalidLength"] = 6] = "InvalidLength";
    AppErrorCode[AppErrorCode["ValueExists"] = 7] = "ValueExists";
    AppErrorCode[AppErrorCode["CantBeDeleted"] = 8] = "CantBeDeleted";
    AppErrorCode[AppErrorCode["RelatedEntityNotFound"] = 9] = "RelatedEntityNotFound";
})(AppErrorCode = exports.AppErrorCode || (exports.AppErrorCode = {}));
class CustomError extends Error {
    constructor(params) {
        super(params.message);
        this.msg = params.message || 'Internal Server Error , Please Contact Us .';
        this.errCode = params.errCode || AppErrorCode.InternalServerError;
        this.status = params.status || 500;
        this.field = params.field;
        Error.captureStackTrace(this, CustomError);
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=http.error.response.js.map