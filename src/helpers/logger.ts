import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.prettyPrint(),
        format.colorize(),
        format.metadata(),
    ),
    exceptionHandlers: [
        new transports.File({ filename: 'uncaughtExceptions.log' }),
    ],
    transports: [
        new transports.File({ filename: 'error.log', level: 'error' }),
        // new transports.File({ filename: 'combined.log', level: 'debug' }),

    ],
})


// process.on('unhandledRejection', (ex) => {
//     throw ex;
// });


// logger.in