import mysql, { Connection } from "mysql2/promise";
import { database, host, password } from "../common/environment.variables";

export const getConnection = async (): Promise<Connection | undefined> => {
  try {
    const con = await mysql.createConnection({
      host: host,
      database: database,
      user: "root",
      password: password,
    });
    return con;
  } catch (error) {
    if (error instanceof Error) {
      console.log(
        `Error occur while connecting with database ${error.message}`,
      );
      throw new Error(
        `Error occur while connecting with database ${error.message}`,
      );
    }
  }
};
