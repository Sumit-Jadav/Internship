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
app.get("/", async (req, res) => {
  const [data] = await db.execute(
    `SELECT a.id,a.first_name,a.last_name,phone_number,a.email_address,a.gender,a.date_of_birth,a.applied_designation,a.relationship_status,ad.first_line,ad.second_line,ad.applicant_city,ad.applicant_state,ad.applicant_pincode from job_applicants as a inner join applicants_address as ad on a.id = ad.applicant_id`,
  );
  console.log(JSON.stringify(data));

  res.render("index", { data });
});

app.get("/insert", (req, res) => {
  res.status(200).render("insert");
});

app.get("/lan", async (req, res) => {
  const id = parseInt(req.query.id);
  try {
    const [lanData] = await db.execute(
      `SELECT * FROM language_known where applicant_id = ?`,
      [id],
    );
    console.log(JSON.stringify(lanData));

    res.status(200).render("language", { lanData });
  } catch (e) {
    console.log(`Error while fetching language:${e.message}`);
    res.status(500).render("language", { lanData: [] });
  }
});

app.get("/skill", async (req, res) => {
  try {
    const id = parseInt(req.query.id);
    const [skills] = await db.execute(
      "SELECT * FROM technologies_known where applicant_id = ?",
      [id],
    );
    console.log(JSON.stringify(skills));
    res.render("skills", { skills });
  } catch (error) {
    console.log(`Error occure while fetching skills :${error.message}`);
  }
});

app.get("/work", async (req, res) => {
  try {
    const id = parseInt(req.query.id);
    const [workExperience] = await db.execute(
      "SELECT * FROM work_experiences where applicant_id = ?",
      [id],
    );
    console.log(JSON.stringify(workExperience));
    res.render("work", { work: workExperience });
  } catch (error) {
    console.log(`Error occure while fetching work experience:${error.message}`);
  }
});

app.get("/edu", async (req, res) => {
  try {
    const id = parseInt(req.query.id);
    const [education] = await db.execute(
      "SELECT * FROM education_details where applicant_id = ?",
      [id],
    );
    console.log(JSON.stringify(education));
    res.render("education", { education });
  } catch (error) {
    console.log(
      `Error occure while fetching education records:${error.message}`,
    );
  }
});

app.get("/ref", async (req, res) => {
  try {
    const id = parseInt(req.query.id);
    const [reference] = await db.execute(
      "select * from job_references where applicant_id = ?",
      [id],
    );
    res.status(200).render("reference", { reference });
  } catch (error) {
    console.log(
      `Error occure while fetching reference details:-${error.message}`,
    );
  }
});

app.get("/pref", async (req, res) => {
  try {
    const id = parseInt(req.query.id);
    const [preference] = await db.execute(
      "select * from applicant_preferences where applicant_id = ?",
      [id],
    );
    res.status(200).render("preference", { preference });
  } catch (e) {
    console.log(`Error occure while fetching preference data:${e.message}`);
  }
});

app.get("/delete-education", async (req, res) => {
  try {
    const id = parseInt(req.query.id);

    const [result] = await db.execute(
      "DELETE FROM education_details where id = ?",
      [id],
    );

    if (result.affectedRows > 0) {
      console.log(`Education record with id ${id} deleted successfully.`);
      res
        .status(200)
        .json({ message: "Education record deleted successfully." });
    } else {
      console.log(`No education record found with id ${id}.`);
      res.status(404).json({ message: "Education record not found." });
    }
  } catch (e) {
    console.log(`Error occure while deleting education details ${e.message}`);
  }
});

app.get("/delete-experience", async (req, res) => {
  try {
    const id = parseInt(req.query.id);
    const [result] = await db.execute(
      "delete from work_experiences where id = ?",
      [id],
    );

    if (result.affectedRows > 0) {
      console.log(`Work experience record with id ${id} deleted successfully.`);
      res
        .status(200)
        .json({ message: "Work experience record deleted successfully." });
    } else {
      console.log(`No work experience record found with id ${id}.`);
      res.status(404).json({ message: "Work experience record not found." });
    }
  } catch (error) {
    console.log(`Error while deleting experience${error.message}`);
  }
});

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
  console.log(req.body);

  const email = req.body.email;
  try {
    // Insering Personal Data
    const [response] = await db.execute(
      "INSERT INTO `job_applicants`(`first_name`, `last_name`, `email_address`, `phone_number`, `gender`, `date_of_birth`,`applied_designation`,`relationship_status`) VALUES (?,?,?,?,?,?,?,?)",
      [fname, lname, email, String(phone), gender, birth, designation, status],
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
      `insert into applicants_address(applicant_id,first_line,second_line,applicant_city,applicant_state,applicant_pincode) values (?,?,?,?,?,?)`,
      [lastid, fline, sline, city, state, zipcode],
    );

    //inserting educational data
    for (let i = 0; i < courses.length; i++) {
      const [eduData] = await db.execute(
        `insert into education_details(applicant_id,course,passing_year,university,result) values (?,?,?,?,?)`,
        [lastid, courses[i], passYears[i], universities[i], results[i]],
      );
    }

    // Inserting experience data
    for (let i = 0; i < company.length; i++) {
      console.log(from[i]);

      const [expData] = await db.execute(
        `insert into work_experiences(applicant_id,company_name,designation,from_date,to_date,annual_package,reason_to_leave,ref_contact_name,ref_contact_number) values(?,?,?,?,?,?,?,?,?)`,
        [
          lastid,
          company[i],
          designations[i],
          from[i],
          to[i],
          packageData[i],
          reason[i],
          refName[i],
          refContact[i],
        ],
      );
    }

    // Inserting reference data
    for (let i = 0; i < referenceName.length; i++) {
      console.log(referenceName[i]);

      const [referenceData] = await db.execute(
        `insert into job_references(applicant_id,reference_name,reference_contact,relation) values(?,?,?,?)`,
        [
          lastid,
          String(referenceName[i]),
          String(referenceContact[i]),
          relation[i],
        ],
      );
    }

    // Inserting preference data
    const [preferenceData] = await db.execute(
      `insert into applicant_preferences(applicant_id,prefer_location,notice_period,expected_ctc,current_ctc,department) values(?,?,?,?,?,?)`,
      [
        lastid,
        data["location[]"].join(","),
        parseInt(data.notice),
        data.ectc,
        data.cctc,
        data.department,
      ],
    );

    //Inserting Language Data
    const selectedLanguages = req.body.languageData || [];
    for (let lang of selectedLanguages) {
      await db.execute(
        "INSERT INTO language_known (applicant_id, language_name, can_read, can_write, can_speak) VALUES (?, ?, ?, ?, ?)",
        [lastid, lang.name, lang.read, lang.write, lang.speak],
      );
    }

    //Inserting Technology Data
    const selectedTechs = req.body.techonologyData || [];
    for (let tech of selectedTechs) {
      await db.execute(
        "INSERT INTO technologies_known (applicant_id, technology_name, is_beginner, is_advance, is_expert) VALUES (?, ?, ?, ?, ?)",
        [lastid, tech.name, tech.beginner, tech.intermediate, tech.expert],
      );
    }
  } catch (e) {
    console.error("Error occurred while inserting data:", e.message);
  }

  console.log("URL hit");
  // console.log(data);
});

app.get("/delete-preference", async (req, res) => {
  try {
    const id = parseInt(req.query.id);
    const [result] = await db.execute(
      "DELETE FROM applicant_preferences where id = ?",
      [id],
    );

    if (result.affectedRows > 0) {
      console.log(`Preference record with id ${id} deleted successfully.`);
      res
        .status(200)
        .json({ message: "Preference record deleted successfully." });
    } else {
      console.log(`No preference record found with id ${id}.`);
      res.status(404).json({ message: "Preference record not found." });
    }
  } catch (error) {
    console.log(`Error occure while deleting preferences:${error.message}`);
  }
});

app.get("/delete-reference", async (req, res) => {
  try {
    const id = parseInt(req.query.id);
    const [result] = await db.execute(
      "delete from job_references where id = ?",
      [id],
    );
    if (result.affectedRows > 0) {
      console.log(`Reference record with id ${id} deleted successfully.`);
      res
        .status(200)
        .json({ message: "Reference record deleted successfully." });
    } else {
      console.log(`No reference record found with id ${id}.`);
      res.status(404).json({ message: "Reference record not found." });
    }
  } catch (error) {
    console.log(`Error occure while deleting reference:${error.message}`);
  }
});

app.get("/delete-language", async (req, res) => {
  try {
    const id = parseInt(req.query.id);
    const [result] = await db.execute(
      "delete from language_known where id = ?",
      [id],
    );
    if (result.affectedRows > 0) {
      console.log(`Language record with id ${id} deleted successfully.`);
      res
        .status(200)
        .json({ message: "Language record deleted successfully." });
    } else {
      console.log(`No language record found with id ${id}.`);
      res.status(404).json({ message: "Language record not found." });
    }
  } catch (error) {
    console.log(`Error occure while deleting language:${error.message}`);
  }
});

app.get("/delete-skill", async (req, res) => {
  try {
    const id = parseInt(req.query.id);
    const [result] = await db.execute(
      "delete from technologies_known where id = ?",
      [id],
    );
    if (result.affectedRows > 0) {
      console.log(`Techonology record with id ${id} deleted successfully.`);
      res
        .status(200)
        .json({ message: "Techonology record deleted successfully." });
    } else {
      console.log(`No techonology record found with id ${id}.`);
      res.status(404).json({ message: "Techonology record not found." });
    }
  } catch (e) {
    console.log(`Error occure while deleting techonology:${e.message}`);
  }
});

app.get("/delete-application", async (req, res) => {
  try {
    const id = parseInt(req.query.id);
    const [result] = await db.execute(
      "DELETE from job_applicants where id = ?",
      [id],
    );
    if (result.affectedRows > 0) {
      console.log(`Application record with id ${id} deleted successfully.`);
      res
        .status(200)
        .json({ message: "Application record deleted successfully." });
    } else {
      console.log(`No application record found with id ${id}.`);
      res.status(404).json({ message: "Application record not found." });
    }
  } catch (e) {
    console.log(`Error occure while deleting the application ${e.message}`);
  }
});

app.get("/edit-application", async (req, res) => {
  try {
    const id = parseInt(req.query.id);
    const [appData] = await db.execute(
      "select * from job_applicants inner join applicants_address on job_applicants.id = applicants_address.applicant_id where job_applicants.id = ?",
      [id],
    );
    // console.log(appData);
    res.status(200).render("edit/application", { appData: appData[0] });
  } catch (e) {
    console.log(`Error occure while selecting:${e.message}`);
  }
});

app.post("/edit-application", async (req, res) => {
  try {
    const id = req.body.id;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const phone = req.body.phone;
    const email = req.body.email;
    const gender = req.body.gender;
    const birth = req.body.birth;
    const designation = req.body.designation;
    const status = req.body.status;

    const [result] = await db.execute(
      "update job_applicants set first_name=?,last_name=?,email_address=?,phone_number=?,gender=?,date_of_birth=?,designation=?,status=? where id=?",
      [fname, lname, email, phone, gender, birth, designation, status, id],
    );
    if (result.affectedRows > 0) {
      console.log(`Application record with id ${id} updated successfully.`);
      res
        .status(200)
        .json({ message: "Application record updated successfully." });
    } else {
      console.log(`No application record found with id ${id}.`);
      res.status(404).json({ message: "Application record not found." });
    }
  } catch (error) {
    console.log(`Error occure while updating:${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
