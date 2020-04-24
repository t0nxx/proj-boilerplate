"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const AuthMiddleWare_1 = require("../middlewares/AuthMiddleWare");
const asyncWrapper_1 = require("../helpers/asyncWrapper");
const router = express_1.Router();
const userController = new UserController_1.UserController();
router
    .get('/', asyncWrapper_1.asyncWrapper(userController.all))
    .get('/:id', asyncWrapper_1.asyncWrapper(userController.showOne))
    .patch('/:id', AuthMiddleWare_1.AuthMiddleWare, asyncWrapper_1.asyncWrapper(userController.update))
    .delete('/:id', AuthMiddleWare_1.AuthMiddleWare, asyncWrapper_1.asyncWrapper(userController.delete));
exports.default = router;
//# sourceMappingURL=UserRouter.js.map