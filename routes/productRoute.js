import { Router } from "express";

import {
  getUser,
  createUser,
  updateUser,
  removeUser,
  addOrUpdateUserAdress,
} from "../controllers/userController.js";
import { isAuthenticatedUser, isAuthenticatedAdmin } from "../auth.js";

export default /* Product */ Router()
  .get("/:_id", getProductById)
  .post("/create", isAuthenticatedAdmin, createProduct)
  .patch("/update", isAuthenticatedAdmin, updateProduct)
  .delete("/remove", isAuthenticatedAdmin, removeProduct);
