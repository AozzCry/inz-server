import { Router } from "express";

import {
  getSelfUser,
  createUser,
  updateSelfUser,
  removeSelfUser,
  addOrUpdateSelfUserAddress,
} from "../controllers/userController.js";
import { isAuthenticatedUser } from "../auth.js";

export default /* User */ Router()
  .get("/", isAuthenticatedUser, getSelfUser)
  .post("/create", isAuthenticatedUser, createUser)
  .patch("/update", isAuthenticatedUser, updateSelfUser)
  .delete("/remove", isAuthenticatedUser, removeSelfUser)
  .put("/address", isAuthenticatedUser, addOrUpdateSelfUserAddress);
