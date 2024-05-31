import express from "express";
import {
  getClients,
  postClients,
  updateClients,
} from "../controllers/api/clientsController.js";
import { verifyToken } from "../controllers/auth/authMiddleware.js";

const clientRouter = express.Router();

clientRouter.post("/clients/form", verifyToken, postClients);
clientRouter.put("/clients/update", verifyToken, updateClients);
clientRouter.get("/clients", verifyToken, getClients);

export default clientRouter;
