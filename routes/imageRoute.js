import { Router } from "express";
import upload from "../utils/multer.js";

import {
  deleteImage,
  getProductImages,
  saveImage,
} from "../controllers/imageController.js";
import { isAuthenticatedAdmin } from "../utils/auth.js";

export default /* image */ Router()
  .get("/", getProductImages)
  .post("/", upload.single("image"), saveImage)
  .patch("/", isAuthenticatedAdmin, deleteImage);
