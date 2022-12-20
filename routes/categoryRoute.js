import { Router } from "express";

import {
  getAllCategories,
  createCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { isAuthenticatedAdmin } from "../utils/auth.js";

export default /* category */ Router()
  .get("/", getAllCategories)
  .post("/create", isAuthenticatedAdmin, createCategory)
  .patch("/delete", isAuthenticatedAdmin, deleteCategory);
