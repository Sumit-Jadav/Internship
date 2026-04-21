import { Request, Response } from "express";
import { Iresponse } from "../../../common/interfaces/response.interface";
import { IRequest } from "../../../common/interfaces/request.interface";
import { getConnection } from "../../../config/database.connect";

import {
  generateToken,
  hashPassword,
  varifyPassword,
} from "../../../common/helper.functions";

export const handleRegister = async (
  req: Request,
  res: Response,
): Promise<void | Response> => {
  try {
    const reqData: IRequest & { captchaId: number } = {
      email: req.body.email,
      password: req.body.password,
      captcha: req.body.captcha,
      captchaId: req.body.id,
    };
    const db = await getConnection();
    const [user]: any = await db?.execute(
      "select * from users where email = ?",
      [reqData.email],
    );
    const [captcha]: any = await db?.execute(
      "select * from captcha where id = ? ",
      [reqData.captchaId],
    );
    const captchaText = captcha[0].captcha;
    const expiryTime = new Date(captcha[0].expires_at);
    if (reqData.captcha !== captchaText) {
      return res.status(400).json({
        status: 400,
        message: "Invalid Capcha",
      } as Iresponse);
    }
    if (new Date() > expiryTime) {
      return res.status(400).json({
        status: 400,
        message: "Captcha Expires",
      } as Iresponse);
    }
    // console.log(user);

    if (user.length > 0) {
      return res.status(401).json({
        status: 401,
        message: `User already exists`,
      } as Iresponse);
    }
    const hash = await hashPassword(reqData.password);
    const [insertData]: any = await db!.execute(
      "insert into users(email , hash_password) values(?,?)",
      [reqData.email, hash],
    );
    return res.status(201).json({
      status: 201,
      message: "User created",
    } as Iresponse);
    // console.log(reqData);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        status: 500,
        message: `Error occur while register :${error.message}`,
        error: error,
      } as Iresponse);
    }
  }
};

export const getRegisterForm = (
  req: Request,
  res: Response,
): Response | void => {
  try {
    return res.status(200).render("register_user");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        status: 500,
        message: `Error while fetching register form ${error.message}`,
      } as Iresponse);
    }
  }
};

export const getLoginForm = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    return res.status(200).render("login_user");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).render("login_user", {
        status: 500,
        message: `Error while getting login form ${error.message} `,
        error: error,
      } as Iresponse);
    }
  }
};

export const handleLogin = async (
  req: Request,
  res: Response,
): Promise<void | Response> => {
  try {
    // console.log(req.body);

    const db = await getConnection();
    const reqData: IRequest = {
      email: req.body.email,
      password: req.body.password,
      captcha: req.body.captcha,
      remember: req.body?.remember,
      captchaId: req.body.id,
    };
    // console.log(reqData.remember);

    const [user]: any = await db!.execute(
      "select * from users where email = ?",
      [reqData.email, 0],
    );
    const [captcha]: any = await db?.execute(
      "select * from captcha where id = ? ",
      [reqData.captchaId],
    );

    if (user.length == 0) {
      return res.status(404).json({
        status: 404,
        message: `User with such email and password does not exists`,
      } as Iresponse);
    }
    if (user[0].is_locked) {
      return res.status(401).json({
        status: 400,
        message: "Your account is locked Contact Admin",
      } as Iresponse);
    }
    if (captcha.length == 0) {
      return res.status(400).json({
        status: 400,
        message: "Invalid Captcha",
      } as Iresponse);
    }
    const captchaText = captcha[0].captcha;
    if (reqData.captcha !== captchaText) {
      return res
        .status(400)
        .json({ status: 400, message: "Invalid Captcha" } as Iresponse);
    }
    if (new Date(captcha[0].expires_at) < new Date()) {
      return res.status(400).json({
        status: 400,
        message: "Captcha Expires",
      } as Iresponse);
    }
    const last_update_date = new Date(user[0].password_updated_at);
    const today = new Date();
    const password_expiry = new Date(
      last_update_date.getTime() + 30 * 24 * 60 * 60 * 1000,
      // last_update_date.getTime() + 60 * 1000,
    );
    if (password_expiry < today) {
      return res.status(403).json({
        status: 403,
        message: "Password Expired Please update your password",
      } as Iresponse);
    }
    const failed_attempts: number = Number(user[0].failed_attempts);
    const isPasswordValid: boolean = await varifyPassword(
      reqData.password,
      user[0].hash_password,
    );
    if (!isPasswordValid) {
      await db?.execute("update users set failed_attempts = ? where id = ?", [
        failed_attempts + 1,
        user[0].id,
      ]);
      if (failed_attempts + 1 == 3) {
        await db?.execute("update users set is_locked = ? where id = ?", [
          1,
          user[0].id,
        ]);
      }
      return res.status(401).json({
        status: 401,
        message: "Email or Password is wrong",
      } as Iresponse);
    }

    const token: string = generateToken({
      email: user[0].email,
      id: user[0].id,
    });
    if (typeof reqData.remember == "undefined") {
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
      });
    } else {
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Login Success",
      data: [token],
    } as Iresponse);
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      return res.status(500).json({
        status: 500,
        message: `Error while handling login route ${error.message}`,
        error: error,
      } as Iresponse);
    }
  }
};

export const handleLogout = (req: Request, res: Response): Response | void => {
  try {
    res.clearCookie("token");
    return res.status(200).redirect("/users/auth/login");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        status: 500,
        message: `Error while logoting user ${error.message}`,
        error: error,
      } as Iresponse);
    }
  }
};
