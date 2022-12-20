import { Router } from "express";

import {
  getSelfOrders,
  getAllOrders,
  getOrdersById,
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
  .get("/getbyid", isAuthenticatedAdmin, getOrdersById)
  .patch("/status", isAuthenticatedAdmin, changeOrderStatus)
  .patch("/delete", isAuthenticatedAdmin, deleteOrder);
