import { Router } from "express";

import {
  getSelfUser,
  updateSelfUser,
  deleteSelfUser,
  addOrUpdateSelfUserAddress,
  getAllUsers,
  banUserByID,
  deleteUserByID,
} from "../controllers/userController.js";
import { isAuthenticatedUser, isAuthenticatedAdmin } from "../utils/auth.js";

export default /* user */ Router()
  .get("/", isAuthenticatedUser, getSelfUser)
  .patch("/update", isAuthenticatedUser, updateSelfUser)
  .delete("/delete", isAuthenticatedUser, deleteSelfUser)
  .put("/address", isAuthenticatedUser, addOrUpdateSelfUserAddress)

  .get("/getall", isAuthenticatedAdmin, getAllUsers)
  .patch("/banbyid", isAuthenticatedAdmin, banUserByID)
  .patch("/deletebyid", isAuthenticatedAdmin, deleteUserByID);
