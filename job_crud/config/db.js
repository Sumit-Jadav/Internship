const mysql = require("mysql2/promise");
require("dotenv").config();

const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;

const connectDB = async () => {
  try {
    const pool = mysql.createConnection({
      host,
      user: "root",
      password,
      database,
    });
    console.log(`Connected with Database`);
    return pool;
  } catch (e) {
    console.log(`Error occure while connecting ${e.message}`);
  }
};

module.exports = connectDB;
