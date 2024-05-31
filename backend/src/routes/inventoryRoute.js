import express from 'express';
import {
    getPurchases,
    getSales,
    getPurchaseOrders,
    getSaleOrders,
    getSuppliers,
    getClients,
    getInventory
} from '../controllers/api/inventoryController.js';
import { verifyToken } from '../controllers/auth/authMiddleware.js';

const inventoryRouter = express.Router();

inventoryRouter.get("/dashboard/purchase", verifyToken, getPurchases);
inventoryRouter.get("/dashboard/sales", verifyToken, getSales);
inventoryRouter.get("/dashboard/purchaseorders", verifyToken, getPurchaseOrders);
inventoryRouter.get("/dashboard/saleorders", verifyToken, getSaleOrders);
inventoryRouter.get("/dashboard/suppliers", verifyToken, getSuppliers);
inventoryRouter.get("/dashboard/clients", verifyToken, getClients);
inventoryRouter.get("/dashboard/inventory", verifyToken, getInventory);

export default inventoryRouter;