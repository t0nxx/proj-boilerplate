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
const mysql = require("mysql");
const colorize = require("chalk");
exports.CheckDataBaseCreation = () => __awaiter(void 0, void 0, void 0, function* () {
    const con = mysql.createConnection({
        host: process.env.DBHOST,
        port: parseInt(process.env.DBPORT, 10),
        user: process.env.DBUSERNAME,
        password: process.env.DBPASSWORD,
    });
    con.connect((err) => {
        if (err) {
            console.log(err);
            throw err;
        }
        con.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DBNAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`, (err, result) => {
            if (err) {
                throw err;
            }
            console.log(colorize.whiteBright.bgGrey.bold('Database check done ----------------'));
        });
        con.end();
    });
});
//# sourceMappingURL=database.check.js.map