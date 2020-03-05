import { Router } from 'express';
import UserRouter from './UserRouter';
import AuthRouter from './AuthRouter';

const routes = Router();

routes.use('/user', UserRouter);
routes.use('/auth', AuthRouter);

export default routes;
