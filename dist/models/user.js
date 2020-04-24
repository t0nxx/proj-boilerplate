"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
let UserModel = class UserModel {
    hashPasswordMethod(pass) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcryptjs_1.hash(pass, 10);
        });
    }
    comparePasswordMethod(pass) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcryptjs_1.compare(pass, this.password);
        });
    }
    generateJwtTokenMethod(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield jsonwebtoken_1.sign(args, process.env.JWTSECRET, { expiresIn: '60d' });
        });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserModel.prototype, "id", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'email is required' }),
    class_validator_1.IsEmail(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserModel.prototype, "email", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'password is required' }),
    class_validator_1.MinLength(6),
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserModel.prototype, "password", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.Generated('uuid'),
    __metadata("design:type", String)
], UserModel.prototype, "reset_token", void 0);
UserModel = __decorate([
    typeorm_1.Entity('user')
], UserModel);
exports.UserModel = UserModel;
//# sourceMappingURL=user.js.map