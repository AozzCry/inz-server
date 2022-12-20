import { Router } from "express";
import {
  findProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getHomeProducts,
} from "../controllers/productController.js";
import { isAuthenticatedAdmin } from "../utils/auth.js";

export default /* product */ Router()
  .get("/", findProducts)
  .get("/home", getHomeProducts)
  .get("/:nameLink", getProductById)

  .post("/create", isAuthenticatedAdmin, createProduct)
  .patch("/update", isAuthenticatedAdmin, updateProduct)
  .patch("/delete", isAuthenticatedAdmin, deleteProduct);
