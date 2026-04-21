import express, { Express } from "express";
import path from "node:path";
import cookieParser from "cookie-parser";
import { authUserRouter } from "./modules/users/routes/auth.routes";
import { dashboardRouter } from "./modules/users/routes/dashboard.route";
import { captchaRouter } from "./modules/captcha/routes/captcha.route";
import { forgotPasswordRouter } from "./modules/forgot-password/routes/forgot.route";

export const app: Express = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/users/auth", authUserRouter);
app.use("/dashboard", dashboardRouter);
app.use("/captcha", captchaRouter);
app.use("/users/auth/", forgotPasswordRouter);
// app.get("/cookie", (req, res) => {
//   console.log(req.cookies);
//   //   console.log(req.headers);
//   console.log(req);

//   return res.send(req.cookies.token);
// });
