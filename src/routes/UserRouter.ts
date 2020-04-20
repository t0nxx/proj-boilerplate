import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { AuthMiddleWare } from '../middlewares/AuthMiddleWare';
import { asyncWrapper } from 'src/helpers/asyncWrapper';

const router = Router();
const userController = new UserController();
// for auth . add AuthMiddleWare

router
    .get('/', asyncWrapper(userController.all))

    .get('/:id', asyncWrapper(userController.showOne))

    .patch('/:id', AuthMiddleWare, asyncWrapper(userController.update))

    .delete('/:id', AuthMiddleWare, asyncWrapper(userController.delete));

export default router;
