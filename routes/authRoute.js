import { Router } from "express";

import {
  Register,
  Login,
  Logout,
  refreshSession,
} from "../controllers/authController.js";

export default /* auth */ Router()
  .post("/register", Register)
  .post("/login", Login)
  .post("/logout", Logout)
  .get("/refresh", refreshSession);
