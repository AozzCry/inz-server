import { Router } from "express";

import {
  getSelfOrders,
  getAllOrders,
  createOrder,
  changeOrderStatus,
  deleteOrder,
} from "../controllers/orderController.js";
import { isAuthenticatedUser, isAuthenticatedAdmin } from "../utils/auth.js";

export default /* order */ Router()
  .get("/", isAuthenticatedUser, getSelfOrders)
  .post("/create", isAuthenticatedUser, createOrder)
  .patch("/status", isAuthenticatedUser, changeOrderStatus)

  .get("/getall", isAuthenticatedAdmin, getAllOrders)
  .patch("/status", isAuthenticatedAdmin, changeOrderStatus)
  .delete("/:_id", isAuthenticatedAdmin, deleteOrder);
