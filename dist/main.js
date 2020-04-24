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
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express = require("express");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const index_1 = require("./routes/index");
const logger_1 = require("./helpers/logger");
const colorize = require("chalk");
const http_error_response_1 = require("./helpers/http.error.response");
const database_check_1 = require("./jobs/database.check");
dotenv.config();
const app = express();
database_check_1.CheckDataBaseCreation().then(done => {
    typeorm_1.createConnection().then((connection) => __awaiter(void 0, void 0, void 0, function* () {
        app.use(bodyParser.json({ limit: '10mb' }));
        app.use(cors());
        app.use(fileupload({
            limits: { fileSize: 10 * 1024 * 1024 },
        }));
        app.use(index_1.default);
        app.get('/public', (req, res) => {
            res.sendFile(path.join(__dirname, 'public', 'index.html'));
        });
        app.get('*', (req, res) => {
            res.status(404).send({ error: 'Not Found' });
        });
        app.use((err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(colorize.whiteBright.bgRedBright.bold('Error  --------------------------'));
            console.log(err);
            logger_1.logger.error(`${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`, err);
            const error = err[0] ? Object.values(err[0].constraints) : [err.message];
            err instanceof http_error_response_1.CustomError ? res.status(err.status).json(err) :
                res.status(500).json({ msg: error, errCode: http_error_response_1.AppErrorCode.InternalServerError });
        }));
        app.listen(3000, () => 'running on port 3000');
    })).catch(error => {
        console.log('err connecting database');
        console.log(error);
    });
});
//# sourceMappingURL=main.js.map