const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Connection with database
let db = null;

// Dummy data
const data = [
  {
    id: 1,
    name: "Sumit Jadav",
    phone: "1234567890",
    email: "demo@example.com",
    designation: "Software Engineer",
    address: "101 , Demo , Demo",
    city: "Bhavnagar",
    state: "Gujarat",
    pincode: "364006",
    gender: "male",
    status: "single",
    dob: "2000-01-01",
  },
];

const lan = [
  {
    id: 1,
    name: "Englidh",
    canRead: 1,
    canWrite: 1,
    canSpeak: 1,
  },
];

const skills = [
  {
    id: 1,
    name: "JavaScript",
    proficiency: "Intermediate",
  },
];

async function startServer() {
  try {
    db = await connectDB();
  } catch (e) {
    console.log(`Error Occure: ${e.message}`);
  }
}
startServer();
app.get("/", (req, res) => {
  res.render("index", { data });
});

app.get("/insert", (req, res) => {
  res.status(200).render("insert");
});

app.get("/lan", (req, res) => {
  res.status(200).render("language", { lan });
});

app.get("/skill", (req, res) => res.render("skills", { skills }));

app.post("/insertdata", (req, res) => {
  console.log(req.body["location[]"]);

  const data = req.body;
  console.log("URL hit");
  console.log(data);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
