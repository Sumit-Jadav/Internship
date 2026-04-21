import { Request, Response } from "express";
import { Iresponse } from "../../../common/interfaces/response.interface";
import { randomBytes, randomUUID } from "node:crypto";
import { Connection } from "mysql2/promise";
import { getConnection } from "../../../config/database.connect";
import { baseUrl } from "../../../common/environment.variables";
import { IForgotBody } from "../../../common/interfaces/passwordreset.request.interface";
import { hashPassword, varifyPassword } from "../../../common/helper.functions";

export const getForgotUser = (req: Request, res: Response) => {
  return res.status(200).render("forgot_password");
};

export const getForgotUserDetails = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    console.log(req.body);

    const { email } = req.body;
    const db = await getConnection();
    const [user]: any = await db?.execute(
      "select * from users where email = ?",
      [email],
    );
    if (!user || user.length == 0) {
      return res.status(404).json({
        status: 404,
        message: "No user exists with that email",
      } as Iresponse);
    }
    return res.status(200).json({
      status: 200,
      message: "Success",
      data: [
        {
          path: "/users/auth/get-link",
          userId: user[0].id,
        },
      ],
    } as Iresponse);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        status: 500,
        message: `Error while fetching user for forgot password ${error.message}`,
        error: error,
      } as Iresponse);
    }
  }
};

export const getForgotLink = async (
  req: Request,
  res: Response,
): Promise<string | void | Response> => {
  try {
    const userId: number = Number(req.params.id) as number;
    const uqiqueId = randomBytes(32).toString("hex");
    const timestamp = new Date();
    timestamp.setMinutes(timestamp.getMinutes() + 5);
    const expiry = timestamp;
    const con: Connection = (await getConnection()) as Connection;
    await con.execute(
      "update users set reset_link_token = ? , reset_token_expiry = ? where id = ?",
      [uqiqueId, expiry, userId],
    );

    return res.render("forgot_link", {
      status: 200,
      message: "Link Generated",
      data: [
        baseUrl + `/users/auth/forgot/password?id=${uqiqueId}&uid=${userId}`,
      ],
    } as Iresponse);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        status: 500,
        message: `Error while generating forgot password link ${error.message}`,
        error: error,
      } as Iresponse);
    }
  }
};

export const getUpdatePasswordForm = (req: Request, res: Response) => {
  const token = req.query.id as string;
  const id = req.query.uid as string;
  return res.status(200).render("password_reset", {
    id: id,
    token: token,
  });
};

export const handleUpdatePassword = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    const reqData = {
      password: req.body.password as string,
      confirm: req.body.conform_password as string,
      token: req.body.token as string,
      id: parseInt(req.body.id),
    } as IForgotBody;
    console.log(" id", req.body.id, " token", reqData.token);

    const db = await getConnection();
    const [user]: any = await db?.execute("select * from users where id = ?", [
      reqData.id,
    ]);
    console.log(user);

    if (user.length == 0) {
      return res.status(404).json({
        status: 404,
        message: "No such user found",
      } as Iresponse);
    }
    if (reqData.password !== reqData.confirm) {
      return res.status(400).json({
        status: 400,
        message: "Both Password should match",
      } as Iresponse);
    }
    const hashNewPassword = await hashPassword(reqData.password);
    const varify = await varifyPassword(
      reqData.password,
      user[0].hash_password,
    );
    // console.log(
    //   "old ",
    //   user[0].hash_password,
    //   " \nnew ",
    //   hashNewPassword,
    //   varify,
    // );
    console.log(varify);

    if (varify) {
      return res.status(400).json({
        status: 400,
        message: "Password can't be same as old password",
      } as Iresponse);
    }

    if (reqData.token !== user[0].reset_link_token) {
      return res.status(400).json({
        status: 400,
        message: "Token is invalid",
      } as Iresponse);
    }
    if (new Date(user[0].reset_token_expiry) < new Date()) {
      return res.status(400).json({
        status: 400,
        message: "Token Expired",
      } as Iresponse);
    }

    await db?.execute(
      "update users set hash_password = ? , reset_link_token = ? , reset_token_expiry = ?,password_updated_at = ?  where id = ?",
      [hashNewPassword, null, null, new Date(), reqData.id],
    );
    return res.status(200).json({
      status: 200,
      message: "Password Updated",
    } as Iresponse);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        status: 500,
        message: `Error while updating password : ${error.message}`,
        error: error,
      } as Iresponse);
    }
  }
};
