import { Router } from "express";
import { getDashBoard } from "../controllers/dashboard.controller";
import { isAuthenticated } from "../../../middlewares/auth.middleware";

export const dashboardRouter: Router = Router();

dashboardRouter.get("/", isAuthenticated, getDashBoard);
