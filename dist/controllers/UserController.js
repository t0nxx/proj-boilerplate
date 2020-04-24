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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const http_error_response_1 = require("../helpers/http.error.response");
const user_1 = require("../models/user");
const pagination_1 = require("../helpers/pagination");
const http_response_1 = require("../helpers/http.response");
class UserController {
    all(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = typeorm_1.getRepository(user_1.UserModel);
            const query = typeorm_1.createQueryBuilder(user_1.UserModel, 'user')
                .select(['user.id', 'user.email']);
            const data = yield pagination_1.ApplyPagination(request, response, next, query);
            http_response_1.OkHttp(response, data);
        });
    }
    showOne(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = typeorm_1.getRepository(user_1.UserModel);
            if (!request.params.id || isNaN(parseInt(request.params.id, 10))) {
                throw new http_error_response_1.CustomError({ message: 'invalid id parameter', status: 400, errCode: http_error_response_1.AppErrorCode.InvalidType });
            }
            const _a = yield userRepository.findOne({ id: parseInt(request.params.id, 10) }), { password } = _a, userData = __rest(_a, ["password"]);
            if (!userData.id) {
                throw new http_error_response_1.CustomError({ message: 'provided id not exist', status: 404, errCode: http_error_response_1.AppErrorCode.RelatedEntityNotFound });
            }
            http_response_1.OkHttp(response, { data: Object.assign({}, userData) });
        });
    }
    update(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = typeorm_1.getRepository(user_1.UserModel);
            const user = yield userRepository.findOne({ id: parseInt(request['user'].id, 10) });
            if (!user) {
                throw new Error('user Not Found');
            }
            yield userRepository.update({ id: user.id }, request.body);
            http_response_1.OkHttp(response);
        });
    }
    delete(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = typeorm_1.getRepository(user_1.UserModel);
            const user = yield userRepository.findOne({ id: parseInt(request.params.id, 10) });
            if (!user) {
                throw new Error('user Not Found');
            }
            yield userRepository.remove(user);
            http_response_1.OkHttp(response);
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map