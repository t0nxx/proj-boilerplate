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
const jsonwebtoken_1 = require("jsonwebtoken");
const typeorm_1 = require("typeorm");
const user_1 = require("../models/user");
exports.AuthMiddleWare = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = typeorm_1.getRepository(user_1.UserModel);
    try {
        if (!req.headers.authorization) {
            throw new Error('Not Token Provided');
        }
        const token = req.headers.authorization;
        if (!token) {
            throw new Error('Not authorized');
        }
        const decode = jsonwebtoken_1.verify(token, process.env.JWTSECRET);
        const user = yield userRepository.findOne({ email: decode.email });
        if (!user) {
            throw new Error('Not authorized');
        }
        req.user = user;
        next();
    }
    catch (error) {
        const err = error[0] ? Object.values(error[0].constraints) : [error.message];
        return res.status(401).send({ success: false, error: err });
    }
});
//# sourceMappingURL=AuthMiddleWare.js.map