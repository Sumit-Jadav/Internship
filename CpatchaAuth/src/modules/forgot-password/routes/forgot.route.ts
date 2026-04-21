import { Router } from "express";
import {
  getForgotLink,
  getForgotUser,
  getForgotUserDetails,
  handleUpdatePassword,
  getUpdatePasswordForm,
} from "../controllers/forgot.controller";

export const forgotPasswordRouter: Router = Router();

forgotPasswordRouter.get("/get-user", getForgotUser);
forgotPasswordRouter.post("/get-user", getForgotUserDetails);
forgotPasswordRouter.get("/get-link/:id", getForgotLink);
forgotPasswordRouter.get("/forgot/password", getUpdatePasswordForm);
forgotPasswordRouter.post("/forgot/password", handleUpdatePassword);
