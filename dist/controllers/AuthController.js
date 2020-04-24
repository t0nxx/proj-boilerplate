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
const class_transformer_validator_1 = require("class-transformer-validator");
const typeorm_1 = require("typeorm");
const http_error_response_1 = require("../helpers/http.error.response");
const http_response_1 = require("../helpers/http.response");
const user_1 = require("../models/user");
class AuthController {
    login(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = typeorm_1.getRepository(user_1.UserModel);
            if (!request.body.email || !request.body.password) {
                throw new http_error_response_1.CustomError({ message: 'email/password are required', status: 400, errCode: http_error_response_1.AppErrorCode.IsRequired });
            }
            const user = yield userRepository.findOne({ email: request.body.email });
            if (!user) {
                throw new http_error_response_1.CustomError({ message: 'invalid email / password', errCode: http_error_response_1.AppErrorCode.InvalidType, status: 400 });
            }
            const checkPass = yield user.comparePasswordMethod(request.body.password);
            if (!checkPass) {
                throw new http_error_response_1.CustomError({ message: 'invalid email / password', status: 400, errCode: http_error_response_1.AppErrorCode.InvalidType });
            }
            const token = yield user.generateJwtTokenMethod({ id: user.id, email: user.email });
            const { password } = user, returnedData = __rest(user, ["password"]);
            http_response_1.OkHttp(response, { data: Object.assign(Object.assign({}, returnedData), { token }) });
        });
    }
    signUp(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = typeorm_1.getRepository(user_1.UserModel);
            const validateBody = yield class_transformer_validator_1.transformAndValidate(user_1.UserModel, request.body);
            const emailExist = yield userRepository.findOne({ email: request.body.email });
            if (emailExist) {
                throw new http_error_response_1.CustomError({ message: 'email already exist', status: 400 });
            }
            const newUser = new user_1.UserModel();
            Object.assign(newUser, validateBody);
            const hashedPass = yield newUser.hashPasswordMethod(request.body.password);
            newUser.password = hashedPass;
            const create = yield userRepository.save(newUser);
            console.log(create);
            http_response_1.OkHttp(response, { data: { token: yield create.generateJwtTokenMethod({ id: create.id, email: create.email }) } });
        });
    }
    changePassword(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = typeorm_1.getRepository(user_1.UserModel);
            const user = yield userRepository.findOne({ email: request['user'].email });
            if (!request.body.old_password) {
                throw new Error('Old Password Is Required');
            }
            if (!request.body.new_password) {
                throw new Error('New Password Is Required');
            }
            if (!user.comparePasswordMethod(request.body.old_password)) {
                throw new Error('old password is wrong');
            }
            yield user.hashPasswordMethod(request.body.new_password);
            yield userRepository.save(user);
            http_response_1.OkHttp(response);
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map