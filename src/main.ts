import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as fileupload from 'express-fileupload';
import * as cors from 'cors';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as nodemon from 'nodemon'
import routes from './routes/index';

import { logger } from './helpers/logger';
import * as colorize from 'chalk'
import { currentEnvironment } from './jobs/current.environmernt';
import { CustomError, AppErrorCode } from './helpers/http.error.response';
import { CheckDataBaseCreation } from './jobs/database.check';

dotenv.config();
const app = express();
/**
 * check database and create it if not exist
 */
CheckDataBaseCreation().then(done => {

    createConnection().then(async connection => {

        app.use(bodyParser.json({ limit: '10mb' }));
        app.use(cors());
        app.use(fileupload({
            limits: { fileSize: 10 * 1024 * 1024 },
        }));

        /**
         * use app routes
         */
        app.use(routes);

        /**
         * for static serve
         */
        app.get('/public', (req, res) => {
            res.sendFile(path.join(__dirname, 'public', 'index.html'));
        });

        /**
         * for error page
         */

        app.get('*', (req, res) => {
            res.status(404).send({ error: 'Not Found' });
        });

        /**
         * centeral error handler
         */

        app.use(async (err, req, res, next) => {
            console.log(colorize.whiteBright.bgRedBright.bold('Error  --------------------------'));
            console.log(err);

            /**
             * log errors to log file
             */
            logger.error(`${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`, err);

            // error com from class validator
            const error = err[0] ? Object.values(err[0].constraints) : [err.message];
            err instanceof CustomError ? res.status(err.status).json(err) :
                // catch class validator , unhandle promise errors
                res.status(500).json({ msg: error, errCode: AppErrorCode.InternalServerError });
        });

        app.listen(3000, () => 'running on port 3000');

    }).catch(error => {
        console.log('err connecting database')
        console.log(error);

    });
});

