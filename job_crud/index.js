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

  const courses = req.body["course[]"];
  const passYears = req.body["passYear[]"];
  const universities = req.body["uni[]"];
  const results = req.body["res[]"];
  const company = req.body["company[]"];
  const from = req.body["from[]"];
  const to = req.body["to[]"];
  const packageData = req.body["package[]"];
  const reason = req.body["reason[]"];
  const refContact = req.body["refContact[]"];
  const refName = req.body["refName[]"];
  const designations = req.body["designation[]"];
  const referenceName = req.body["referenceName[]"];
  const referenceContact = req.body["referenceContact[]"];
  const relation = req.body["relation[]"];
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
    for (let i = 0; i < courses.length; i++) {
      const [eduData] = await db.execute(
        `insert into education_details(applicant_id,course,passing_year,university,result) values (${lastid},'${courses[i]}',${passYears[i]},'${universities[i]}','${results[i]}')`,
      );
    }

    // Inserting experience data
    for (let i = 0; i < company.length; i++) {
      console.log(from[i]);

      const [expData] = await db.execute(
        `insert into work_experiences(applicant_id,company_name,designation,from_date,to_date,annual_package,reason_to_leave,ref_contact_name,ref_contact_number) values(${lastid},'${company[i]}','${designations[i]}',${from[i]},${to[i]},'${packageData[i]}','${reason[i]}','${refName[i]}','${refContact[i]}')`,
      );
    }

    // Inserting reference data
    for (let i = 0; i < referenceName.length; i++) {
      const [referenceData] = await db.execute(
        `insert into job_references(applicant_id,reference_name,reference_contact,relation) values(${lastid},'${referenceName[i]}','${referenceContact[i]}','${relation[i]}')`,
      );
    }

    // Inserting preference data
    const [preferenceData] = await db.execute(
      `insert into applicant_preferences(applicant_id,prefer_location,notice_period,expected_ctc,current_ctc,department) values(${lastid},'${data["location[]"].join(",")}','${data.notice}',${data.expected},${data.current},'${data.department}')`,
    );
  } catch (e) {
    console.error("Error occurred while inserting data:", e.message);
  }

  console.log("URL hit");
  console.log(data);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
