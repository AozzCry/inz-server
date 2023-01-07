import { Router } from "express";
import {
  findProducts,
  addOrUpdateProduct,
  deleteProduct,
  getProductByLink,
  getCartProducts,
  getHomeProducts,
} from "../controllers/productController.js";
import { isAuthenticatedAdmin } from "../utils/auth.js";

export default /* product */ Router()
  .get("/", findProducts)
  .get("/home", getHomeProducts)
  .get("/cart", getCartProducts)
  .get("/:nameLink", getProductByLink)

  .put("/addorupdate", isAuthenticatedAdmin, addOrUpdateProduct)
  .delete("/:_id", isAuthenticatedAdmin, deleteProduct);
