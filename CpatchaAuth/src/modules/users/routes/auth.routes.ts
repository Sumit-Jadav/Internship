import { Router } from "express";
import {
  getLoginForm,
  getRegisterForm,
  handleLogin,
  handleLogout,
  handleRegister,
} from "../controllers/auth.controller";
import { alreadyLoggedIn } from "../../../middlewares/auth.middleware";

export const authUserRouter: Router = Router();

authUserRouter.get("/register", getRegisterForm);
authUserRouter.post("/register", handleRegister);
authUserRouter.get("/login", alreadyLoggedIn, getLoginForm);
authUserRouter.post("/login", handleLogin);
authUserRouter.get("/logout", handleLogout);
