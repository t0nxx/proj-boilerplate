"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserRouter_1 = require("./UserRouter");
const AuthRouter_1 = require("./AuthRouter");
const routes = express_1.Router();
routes.use('/user', UserRouter_1.default);
routes.use('/auth', AuthRouter_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map