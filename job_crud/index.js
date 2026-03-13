const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let db = null;
// Getting database reference
async function startServer() {
  try {
    db = await connectDB();
  } catch (e) {
    console.log(`Error Occure: ${e.message}`);
  }
}

function groupFields(body, prefix) {
  const groupedData = [];
  for (const key in body) {
  }
  return groupedData;
}

startServer();
app.get("/", (req, res) => {
  res.render("index", { data });
});

app.get("/insert", (req, res) => {
  res.status(200).render("insert");
});

app.get("/lan", (req, res) => {
  const id = req.query.id;
  try {
    const [lanData] = db.execute(
      `SELECT * FROM languages where applicant_id = ${id}`,
    );
  } catch (e) {
    console.log(`Error while fetching language:${e.message}`);
  }

  res.status(200).render("language", { lan });
});

app.get("/skill", (req, res) => res.render("skills", { skills }));

app.post("/insertdata", async (req, res) => {
  const data = req.body;
  const {
    fname,
    lname,
    designation,
    fline,
    sline,
    city,
    state,
    zipcode,
    phone,
    gender,
    status,
    birth,
  } = req.body;
  console.log(data);

  const email = "demoemail2@example.com";
  try {
    // Insering Personal Data
    const [response] = await db.execute(
      "INSERT INTO `job_applicants`(`first_name`, `last_name`, `email_address`, `phone_number`, `gender`, `date_of_birth`,`applied_designation`,`relationship_status`) VALUES (?,?,?,?,?,?,?,?)",
      [fname, lname, email, phone, gender, birth, designation, status],
    );
    if (response.affectedRows > 0) {
      console.log(`Data inserted success`);
    }
    // Getting last id
    const lastid = response.insertId;
    console.log(JSON.stringify(response));
    console.log(lastid);
    // Inserting Address Data
    const [addressData] = await db.execute(
      `insert into applicants_address(applicant_id,first_line,second_line,applicant_city,applicant_state,applicant_pincode) values (${lastid},'${fline}','${sline}','${city}','${state}',${zipcode})`,
    );

    //inserting educational data
  } catch (e) {
    console.error("Error occurred while inserting data:", e.message);
  }

  console.log("URL hit");
  console.log(data);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
