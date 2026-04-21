import { Router } from "express";
import { handleCaptcha } from "../controllers/captcha.controller";

export const captchaRouter: Router = Router();
captchaRouter.get("/", handleCaptcha);
