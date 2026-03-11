import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
const dbName = process.env.DB_NAME;
const host = process.env.HOST;
const pass = process.env.PASSWORD;
export async function connectDb(params) {
  try {
    const connection = mysql.createConnection({
      host,
      user: "root",
      password: pass,
      database: dbName,
    });
    console.log(`Connected`);
    return connection;
  } catch (error) {
    console.error("❌ MySQL connection error:", err.message);
  }
}
