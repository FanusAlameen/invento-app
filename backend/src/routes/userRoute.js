import express from 'express';
import { getUserDetails } from '../controllers/api/userController.js';
import { verifyToken } from '../controllers/auth/authMiddleware.js';

const userRouter = express.Router();

userRouter.get("/user", verifyToken, getUserDetails);

export default userRouter;