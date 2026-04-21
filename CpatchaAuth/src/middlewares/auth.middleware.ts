import { Request, Response, NextFunction } from "express";
import { Iresponse } from "../common/interfaces/response.interface";
import { varifyToken } from "../common/helper.functions";
import { JwtPayload } from "jsonwebtoken";

export const alreadyLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  try {
    const token: string =
      req.cookies?.token || req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return next();
    } else {
      return res.status(200).redirect("/dashboard");
    }
    // const decodedData: JwtPayload | string = varifyToken(token);
    // if (decodedData) {
    //   return res.status(200).redirect("/dashboard");
    // }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        status: 500,
        message: `Error while checking if already logged in : ${error.message}`,
        error: error,
      } as Iresponse);
    }
  }
};

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token: string =
      req.cookies.token || req.headers?.authorization?.split(" ")[0];
    if (!token) {
      return res.redirect("/users/auth/login");
    }
    try {
      const decodedData: JwtPayload | string = varifyToken(token);
      if (decodedData) {
        // req.body.user = decodedData;
        next();
      } else {
        return res.redirect("/users/auth/login");
      }
    } catch (error) {
      if (error instanceof Error && error.name == "TokenExpiredError") {
        res.clearCookie("token");
        return res.status(200).redirect("/users/auth/login");
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        status: 500,
        message: `Error in authentication middleware ${error.message}`,
        error: error,
      } as Iresponse);
      // return res.redirect("/users/auth/login");
    }
  }
};
