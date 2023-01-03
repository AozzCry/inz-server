import { Router } from "express";
import upload from "../utils/multer.js";

import {
  deleteImage,
  getProductImages,
  saveImage,
  saveMiniImage,
} from "../controllers/imageController.js";
import { isAuthenticatedAdmin } from "../utils/auth.js";

export default /* image */ Router()
  .get("/", getProductImages)
  .post("/full", upload.single("image"), saveImage)
  .post("/mini", upload.single("image"), saveMiniImage)
  .delete("/:_id", isAuthenticatedAdmin, deleteImage);
