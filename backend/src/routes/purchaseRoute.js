import express from 'express';
import { postPurchase, getPurchase } from '../controllers/api/purchaseController.js';
import { verifyToken } from '../controllers/auth/authMiddleware.js';

const purchaseRouter = express.Router();

purchaseRouter.get("/purchases", verifyToken, getPurchase);
purchaseRouter.post("/purchase/form", verifyToken, postPurchase);

export default purchaseRouter;