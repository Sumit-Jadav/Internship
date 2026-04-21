import dotenv from "dotenv";
import { PoolConnection } from "mysql2";

dotenv.config();

export const port: number = parseInt(process.env.PORT as string) || 3000;
export const database: string = process.env.DATABASE as string;
export const password: string = process.env.PASSWORD as string;
export const host: string = process.env.HOST as string;
export const rounds: number = Number(process.env.ROUNDS) as number;
export const secret: string = process.env.JWT_SECRET as string;
export const baseUrl: string = process.env.BASE_URL as string;
