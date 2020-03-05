import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { AuthMiddleWare } from '../middlewares/AuthMiddleWare';
import { UploadToS3 } from '../helpers/awsUploader';

const router = Router();
const userController = new UserController();

// for auth . add AuthMiddleWare

router.get('/', userController.all);

router.post('/new', userController.create);

router.get('/:id', userController.showOne);

router.patch('/:id', AuthMiddleWare, userController.update);

router.delete('/:id', AuthMiddleWare, userController.delete);

export default router;
