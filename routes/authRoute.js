import { Router } from "express";

import { Register, Login, Logout } from "../controllers/authController.js";
import { isAuthenticatedUser } from "../auth.js";

export default Router()
  .post("/register", Register)
  .post("/login", Login)
  .get("/logout", Logout);
