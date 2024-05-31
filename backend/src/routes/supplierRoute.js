import express from "express";
import {
  getSuppliers,
  postSuppliers,
  updateSuppliers,
} from "../controllers/api/suppliersController.js";
import { verifyToken } from "../controllers/auth/authMiddleware.js";

const supplierRouter = express.Router();

supplierRouter.post("/suppliers/form", verifyToken, postSuppliers);
supplierRouter.put("/suppliers/update", verifyToken, updateSuppliers);
supplierRouter.get("/suppliers", verifyToken, getSuppliers);

export default supplierRouter;
