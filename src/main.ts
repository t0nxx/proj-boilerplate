import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as fileupload from 'express-fileupload';
import * as cors from 'cors';
import routes from './routes/index';

const app = express();

createConnection().then(async connection => {

    app.use(bodyParser.json({ limit: '100mb' }));
    app.use(cors());
    app.use(fileupload({
        limits: { fileSize: 100 * 1024 * 1024 },
    }));

    app.use(routes);
  

    // app.get('/dashboard', (req, res) => {
    //     res.sendFile(path.join(__dirname, '..', 'admin', 'index.html'));
    // });

    app.get('*', (req, res) => {
        res.status(404).send({ error: 'Not Found' });
    });

    app.listen(3000, () => 'running on port 3000');

}).catch(error => console.log(error));
