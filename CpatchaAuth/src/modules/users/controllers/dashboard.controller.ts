import { Request, Response } from "express";
import { Iresponse } from "../../../common/interfaces/response.interface";

export const getDashBoard = (req: Request, res: Response): void | Response => {
  try {
    return res.status(200).render("dashboard");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        status: 500,
        message: `Error occur while fetching dashboard ${error.message}`,
      } as Iresponse);
    }
  }
};
