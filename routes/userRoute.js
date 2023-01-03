import { Router } from "express";

import {
  getSelfUser,
  updateSelfUser,
  deleteSelfUser,
  addOrUpdateSelfUserAddress,
  getAllUsers,
  banUserById,
  deleteUserById,
} from "../controllers/userController.js";
import { isAuthenticatedUser, isAuthenticatedAdmin } from "../utils/auth.js";

export default /* user */ Router()
  .get("/", isAuthenticatedUser, getSelfUser)
  .patch("/update", isAuthenticatedUser, updateSelfUser)
  .delete("/self/", isAuthenticatedUser, deleteSelfUser)
  .put("/address", isAuthenticatedUser, addOrUpdateSelfUserAddress)

  .get("/getall", isAuthenticatedAdmin, getAllUsers)
  .patch("/ban/:_id", isAuthenticatedAdmin, banUserById)
  .delete("/:_id", isAuthenticatedAdmin, deleteUserById);
