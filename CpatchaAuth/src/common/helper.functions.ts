import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { password, rounds, secret } from "./environment.variables";

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: "1d",
  });
};

export const varifyToken = (token: string): JwtPayload | string => {
  return jwt.verify(token, secret);
};

export const hashPassword = async (plainPassword: string): Promise<string> => {
  return await bcrypt.hash(plainPassword, rounds);
};

export const varifyPassword = async (
  plainPassword: string,
  hashPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashPassword);
};
