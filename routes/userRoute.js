import { Router } from "express";
import {
  getUser,
  userCreate,
  userAddAdress,
} from "../controllers/userController.js";

import { isAuthenticated } from "../auth.js";

export default /* User */ Router()
  .get("/", getUser)
  .post("/create", userCreate)
  .post("/address", isAuthenticated, userAddAdress);
