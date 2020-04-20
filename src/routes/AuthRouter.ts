import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { AuthMiddleWare } from '../middlewares/AuthMiddleWare';
import { UploadToS3 } from '../helpers/awsUploader';
import { asyncWrapper } from 'src/helpers/asyncWrapper';

const router = Router();
const authController = new AuthController();

// for auth . add AuthMiddleWare

router.post('/login', asyncWrapper(authController.login));

router.post('/register', asyncWrapper(authController.signUp));

export default router;
