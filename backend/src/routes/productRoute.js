import express from "express";
import {
  getProducts,
  postProduct,
  updateProducts,
} from "../controllers/api/productsController.js";
import { verifyToken } from "../controllers/auth/authMiddleware.js";

const productRouter = express.Router();

productRouter.post("/products/form", verifyToken, postProduct);
productRouter.put("/products/update", verifyToken, updateProducts);
productRouter.get("/products", verifyToken, getProducts);

export default productRouter;
