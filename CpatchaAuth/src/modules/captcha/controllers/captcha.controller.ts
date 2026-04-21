import { Request, Response } from "express";
import { Iresponse } from "../../../common/interfaces/response.interface";
import { generateCaptcha } from "../../../utils/generate.captcha.url";
import { generateRandomText } from "../../../utils/random.character.generator";
import { getConnection } from "../../../config/database.connect";
import { QueryResult } from "mysql2";

export const handleCaptcha = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    const captcha: string = generateRandomText(6);
    const captchaURI: string = generateCaptcha(captcha, "base64") as string;
    // console.log(captchaURI);
    const con = await getConnection();
    const date = new Date();
    const expiry = date.setSeconds(date.getSeconds() + 30);
    // const [delete_captcha]: any = await con?.execute(
    //   "delete from captcha where expires_at < NOW()",
    // );
    const [result]: any = await con?.execute(
      "insert into captcha(captcha,expires_at) values(?,?)",
      [captcha, new Date(expiry)],
    );
    const lastId = result?.insertId;
    return res.status(200).json({
      status: 200,
      message: "Captcha successfully generated",
      data: [captchaURI, lastId],
    } as Iresponse);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        status: 500,
        message: `Error while generating captcha ${error.message}`,
        error: error,
      } as Iresponse);
    }
  }
};
