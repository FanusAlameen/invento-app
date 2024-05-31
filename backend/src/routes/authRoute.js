import express from 'express';
import {signup} from '../controllers/auth/signupController.js';
import { login } from '../controllers/auth/loginController.js';

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);

export default authRouter;