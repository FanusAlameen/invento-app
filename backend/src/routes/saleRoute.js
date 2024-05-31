import express from 'express';
import { postSale, getSaleData } from '../controllers/api/saleController.js';
import { verifyToken } from '../controllers/auth/authMiddleware.js';

const saleRouter = express.Router();

saleRouter.post("/sale/form", verifyToken, postSale);
saleRouter.get("/sales", verifyToken, getSaleData);

export default saleRouter;