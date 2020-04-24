"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const asyncWrapper_1 = require("../helpers/asyncWrapper");
const router = express_1.Router();
const authController = new AuthController_1.AuthController();
router.post('/login', asyncWrapper_1.asyncWrapper(authController.login));
router.post('/register', asyncWrapper_1.asyncWrapper(authController.signUp));
exports.default = router;
//# sourceMappingURL=AuthRouter.js.map