"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function ApplyPagination(request, response, next, queryToApplyPagination) {
    return __awaiter(this, void 0, void 0, function* () {
        let pageSize = 10;
        let page = 1;
        request.query.page ? page = parseInt(request.query.page, 10) : page = 1;
        request.query.pageSize ? pageSize = parseInt(request.query.pageSize, 10) : pageSize = 10;
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        queryToApplyPagination.take(pageSize);
        queryToApplyPagination.skip(startIndex);
        try {
            const [results, count] = yield queryToApplyPagination.getManyAndCount();
            const responseObject = { meta: {} };
            responseObject.data = results;
            responseObject.meta.total = count || 0;
            if (endIndex < count) {
                responseObject.meta.nextPage = `https://${request.get('host')}${request.baseUrl}${request.path}?page=${page + 1}&limit=${pageSize}`;
            }
            return responseObject;
        }
        catch (error) {
            next(error);
        }
    });
}
exports.ApplyPagination = ApplyPagination;
//# sourceMappingURL=pagination.js.map