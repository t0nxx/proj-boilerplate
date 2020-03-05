import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { AuthMiddleWare } from '../middlewares/AuthMiddleWare';
import { UploadToS3 } from '../helpers/awsUploader';

const router = Router();
const authController = new AuthController();

// for auth . add AuthMiddleWare

router.post('/login', authController.login);

router.post('/new', authController.signUp);

export default router;
