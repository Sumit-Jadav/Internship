import { IDbUser } from "./db.user.interface";
export interface IForgotBody {
  password: string;
  confirm: string;
  token: string;
  id: number;
}
