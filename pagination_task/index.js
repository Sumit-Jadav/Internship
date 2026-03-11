import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
dotenv.config();
const app = express();
const port = process.env.PORT;

app.set("view engine", "ejs");

// const data = [
//   {
//     id: 1,
//     name: "Sumit",
//   },
//   { id: 2, name: "Darshit" },
//   { id: 3, name: "Keyur" },
//   { id: 4, name: "Yashraj" },
//   { id: 5, name: "Raj" },
//   { id: 6, name: "Aman" },
//   { id: 7, name: "Het" },
//   { id: 8, name: "Heet" },
//   { id: 9, name: "Ishan" },
//   { id: 10, name: "Raju" },
//   { id: 11, name: "Rashamika" },
// ];
// const data = await getUsersName();
const acceptVal = [
  "id",
  "date_of_birth",
  "fname",
  "city",
  "phone_number",
  "email_address",
];
const accept_orders = ["asc", "desc"];
const db = await connectDb();
// console.log(db);

app.get("/", async (req, res) => {
  try {
    const [total] = await db.execute(
      "SELECT count(*) as total_records from students_demo",
    );

    let record_page = parseInt(process.env.RECORDS_PER_PAGE);
    let current_page = parseInt(req.query.page) || 1;
    let total_records = total[0].total_records;
    let total_pages = Math.ceil(total_records / parseInt(record_page));
    let offsetVal = current_page * record_page - record_page;
    const limitVal = record_page;
    const orderField = req.query.orderField || "id";
    const order = req.query.order || "asc";
    if (current_page == 1) {
      offsetVal = 0;
    }
    if (current_page > total_pages && current_page < 1) {
      throw new Error("Invalid page parameter in query string");
    }
    console.log(`OrderField:-${orderField} and order:-${order}`);
    if (!acceptVal.includes(orderField)) {
      throw new Error("Field not defined");
    }
    const [data, fields] = await db.execute(
      `SELECT * from students_demo order by ${orderField} ${order} limit ${offsetVal},${limitVal}`,
    );
    // console.log(JSON.stringify(total_records));
    console.log(`Current Page ${current_page}`);

    console.log(`Total records:${total_records}`);
    console.log(`Total pages ${total_pages}`);

    // console.log(data);
    // console.log(data[0].fname);
    res.render("index", {
      data,
      record_page,
      total_records,
      current_page,
      total_pages,
      orderField,
      order,
    });
  } catch (e) {
    console.log(`Error while fetching  :- ${e.message}`);
  }
});
// getUsersName();
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
