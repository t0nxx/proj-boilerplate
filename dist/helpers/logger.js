"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
exports.logger = winston_1.createLogger({
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.prettyPrint(), winston_1.format.colorize(), winston_1.format.metadata()),
    exceptionHandlers: [
        new winston_1.transports.File({ filename: 'uncaughtExceptions.log' }),
    ],
    transports: [
        new winston_1.transports.File({ filename: 'error.log', level: 'error' }),
    ],
});
//# sourceMappingURL=logger.js.map