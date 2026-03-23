const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
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
  const [total_records] = await db.execute(
    "select count(*) as total from job_applicants",
  );
  const perPage = process.env.RECORD_PER_PAGE || 2;

  console.log(total_records);
  const total_pages = Math.ceil(
    parseInt(total_records[0].total) / parseInt(perPage),
  );
  console.log(total_pages);
  const page = parseInt(req.query.page) || 1;
  const limit = perPage;
  let offset;
  if (page == 0) {
    page = 1;
  }
  if (page == 1) {
    offset = 0;
  } else {
    offset = page * perPage - perPage;
  }
  const [data] = await db.execute(
    `SELECT a.id,a.first_name,a.last_name,phone_number,a.email_address,a.gender,a.date_of_birth,a.applied_designation,a.relationship_status,ad.first_line,ad.second_line,ad.applicant_city,ad.applicant_state,ad.applicant_pincode from job_applicants as a inner join applicants_address as ad on a.id = ad.applicant_id limit ${offset} , ${limit}`,
  );
  // console.log(JSON.stringify(data));

  res.render("index", {
    data,
    total_records: total_records[0].total,
    per_page_records: perPage,
    current_page: page,
    total_pages,
  });
});

app.get("/insert", async (req, res) => {
  try {
    const [lan] = await db.execute("SELECT * FROM languages");
    const [tech] = await db.execute("SELECT * FROM skills");
    console.log(
      `Languages :${JSON.stringify(lan)} \n tech:${JSON.stringify(tech)}`,
    );

    res.status(200).render("insert", { lan, tech });
  } catch (error) {
    res.status(500).json({
      message: `Error occure :${error.message}`,
    });
  }
});

app.get("/lan", async (req, res) => {
  const id = parseInt(req.query.id);
  try {
    const [lanData] = await db.execute(
      `SELECT * FROM language_known where applicant_id = ?`,
      [id],
    );
    // console.log(JSON.stringify(lanData));

    res
      .status(200)
      .render("language", { lanData, id: lanData[0].applicant_id });
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
    // console.log(JSON.stringify(skills));
    res.render("skills", { skills, id: skills[0].applicant_id });
  } catch (error) {
    console.log(`Error occure while fetching skills :${error.message}`);
  }
});

app.get("/work", async (req, res) => {
  try {
    const id = parseInt(req.query.id);
    const [workExperience] = await db.execute(
      "SELECT * FROM work_experiences where applicant_id = ? AND is_deleted=?",
      [id, 0],
    );
    // console.log(JSON.stringify(workExperience));
    res.render("work", { work: workExperience, id });
  } catch (error) {
    console.log(`Error occure while fetching work experience:${error.message}`);
  }
});

app.get("/edu", async (req, res) => {
  try {
    const id = parseInt(req.query.id);
    const [education] = await db.execute(
      "SELECT * FROM education_details where applicant_id = ? AND is_deleted = ?",
      [id, 0],
    );
    // console.log(JSON.stringify(education));
    res.render("education", { education, id });
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
      "select * from job_references where applicant_id = ? and is_deleted=?",
      [id, 0],
    );
    res
      .status(200)
      .render("reference", { reference, id: reference[0].applicant_id });
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
    res.status(200).render("preference", { preference, id });
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
      // console.log(`Education record with id ${id} deleted successfully.`);
      res
        .status(200)
        .json({ message: "Education record deleted successfully." });
    } else {
      // console.log(`No education record found with id ${id}.`);
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
      // console.log(`Work experience record with id ${id} deleted successfully.`);
      res
        .status(200)
        .json({ message: "Work experience record deleted successfully." });
    } else {
      // console.log(`No work experience record found with id ${id}.`);
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
  // console.log(req.body);

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
    // console.log(JSON.stringify(response));
    // console.log(lastid);
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
      // console.log(from[i]);

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
      // console.log(referenceName[i]);

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

  // console.log("URL hit");
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
      // console.log(`Preference record with id ${id} deleted successfully.`);
      res
        .status(200)
        .json({ message: "Preference record deleted successfully." });
    } else {
      // console.log(`No preference record found with id ${id}.`);
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
      // console.log(`Reference record with id ${id} deleted successfully.`);
      res
        .status(200)
        .json({ message: "Reference record deleted successfully." });
    } else {
      // console.log(`No reference record found with id ${id}.`);
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
      // console.log(`Language record with id ${id} deleted successfully.`);
      res
        .status(200)
        .json({ message: "Language record deleted successfully." });
    } else {
      // console.log(`No language record found with id ${id}.`);
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
      // console.log(`Techonology record with id ${id} deleted successfully.`);
      res
        .status(200)
        .json({ message: "Techonology record deleted successfully." });
    } else {
      // console.log(`No techonology record found with id ${id}.`);
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
      // console.log(`Application record with id ${id} deleted successfully.`);
      res
        .status(200)
        .json({ message: "Application record deleted successfully." });
    } else {
      // console.log(`No application record found with id ${id}.`);
      res.status(404).json({ message: "Application record not found." });
    }
  } catch (e) {
    console.log(`Error occure while deleting the application ${e.message}`);
  }
});

app.get("/edit-application", async (req, res) => {
  try {
    const id = parseInt(req.query.id);
    console.log("Get id", id);

    const [appData] = await db.execute(
      "select * from job_applicants inner join applicants_address on job_applicants.id = applicants_address.applicant_id where job_applicants.id = ?",
      [id],
    );

    const [formatDate] = await db.execute(
      "select date_format(date_of_birth,'%Y-%m-%d') as formatted_date from job_applicants where id = ? ",
      [id],
    );

    console.log(appData);
    res.status(200).render("edit/application", {
      appData: appData[0],
      formattedDate: formatDate[0].formatted_date,
    });
  } catch (e) {
    console.log(`Error occure while selecting:${e.message}`);
  }
});

app.post("/edit-application", async (req, res) => {
  try {
    const id = parseInt(req.body.id);
    const fname = req.body.first_name;
    const lname = req.body.last_name;
    const phone = req.body.phone_number;
    const email = req.body.email_address;
    const gender = req.body.gender;
    const birth = req.body.dob;
    const designation = req.body.applied_designation;
    const status = req.body.status;
    console.log(req.body);

    const [result] = await db.execute(
      "update job_applicants set first_name=?,last_name=?,email_address=?,phone_number=?,gender=?,date_of_birth=?,applied_designation=?,relationship_status=? where id=?",
      [fname, lname, email, phone, gender, birth, designation, status, id],
    );

    const [result2] = await db.execute(
      "update applicants_address set first_line=?,second_line=?,applicant_city=?,applicant_state=?,applicant_pincode=? where applicant_id=?",
      [
        req.body.first_line,
        req.body.second_line,
        req.body.applicant_city,
        req.body.applicant_state,
        req.body.applicant_pincode,
        id,
      ],
    );
    if (result.affectedRows > 0 || result2.affectedRows > 0) {
      // console.log(`Application record with id ${id} updated successfully.`);
      res
        .status(200)
        .json({ message: "Application record updated successfully." });
    } else {
      // console.log(`No application record found with id ${id}.`);
      res.status(404).json({ message: "Application record not found." });
    }
  } catch (error) {
    console.log(`Error occure while updating:${error.message}`);
  }
});

app.get("/edit-education", async (req, res) => {
  try {
    const id = parseInt(req.query.id);
    const [eduData] = await db.execute(
      "select * from education_details where applicant_id = ? and is_deleted=?",
      [id, 0],
    );
    // console.log(eduData);
    res.status(200).render("edit/education", { eduData, id });
  } catch (e) {
    console.log(`Error while selecting education data :${e.message}`);
  }
});

app.post("/edit-education", async (req, res) => {
  try {
    const id = parseInt(req.body.id);
    const courses = req.body["course"];
    const passYears = req.body["passing_year"];
    const universities = req.body["university"];
    const results = req.body["result"];

    const [result] = await db.execute(
      "UPDATE education_details SET is_deleted = ?,deleted_at = ?  where applicant_id = ? ",
      [1, new Date(), id],
    );
    if (result.affectedRows > 0) {
      // console.log(
      //   `Education records with applicant_id ${id} marked as deleted.`,
      // );
      // console.log(req.body);

      for (let i = 0; i < courses.length; i++) {
        await db.execute(
          "INSERT INTO education_details (applicant_id, course, university, passing_year, result) VALUES (?, ?, ?, ?, ?)",
          [id, courses[i], universities[i], passYears[i], results[i]],
        );
      }

      res
        .status(200)
        .json({ message: "Education details updated successfully." });
    } else {
      console.log(`No education records found with applicant_id ${id}.`);
    }
  } catch (error) {
    console.log(
      `Error occurred while updating education details: ${error.message}`,
    );
    res.status(500).json({ message: "Internal server error." });
  }
});

app.get("/edit-work", async (req, res) => {
  try {
    const id = parseInt(req.query.id);
    const [result] = await db.execute(
      "select * from work_experiences where applicant_id = ? AND is_deleted = ?",
      [id, 0],
    );

    const [fromDate] = await db.execute(
      "select date_format(from_date,'%Y-%m-%d') as from_date from work_experiences where applicant_id = ? AND is_deleted = ?",
      [id, 0],
    );
    // console.log(fromDate);
    const [toDate] = await db.execute(
      "select date_format(to_date,'%Y-%m-%d') as to_date from work_experiences where applicant_id = ? AND is_deleted = ?",
      [id, 0],
    );
    // console.log(toDate);

    res
      .status(200)
      .render("edit/work", { workData: result, id, fromDate, toDate });
  } catch (error) {
    console.log(`Error while selecting work experience data:${error.message}`);
  }
});

app.post("/edit-work", async (req, res) => {
  try {
    console.log(req.body);
    const id = parseInt(req.body.id);
    const [result] = await db.execute(
      "update work_experiences set is_deleted=? , deleted_at = ? where applicant_id = ?",
      [1, new Date(), id],
    );

    if (result.affectedRows > 0) {
      console.log(`All rows with applicant_id ${id} is set as deleted`);
      // console.log(req.body);
      // console.log(req.body.company[1]);

      for (let i = 0; i < req.body.company.length; i++) {
        const [result2] = await db.execute(
          `insert into work_experiences(applicant_id,company_name,designation,from_date,to_date,annual_package,reason_to_leave,ref_contact_name,ref_contact_number) values(?,?,?,?,?,?,?,?,?)`,
          [
            id,
            req.body.company[i],
            req.body.designation[i],
            req.body.from[i],
            req.body.to[i],
            req.body.package[i],
            req.body.reason[i],
            req.body.ref_name[i],
            req.body.ref_contact[i],
          ],
        );
      }
      res.status(200).json({
        message: "Updation success",
      });
    } else {
      // console.log(`No such records found for updation in work experience!!`);
      res.status(404).json({
        message: `No record found with  id`,
      });
    }
  } catch (error) {
    // console.log(`Error while updating work experiences ${error.message}`);
    res.status(500).json({
      message: `Error : ${error.message}`,
    });
  }
});

app.get("/edit-preference", async (req, res) => {
  try {
    const id = parseInt(req.query.id);
    const [result] = await db.execute(
      "select * from applicant_preferences where applicant_id=?",
      [id],
    );
    console.log(result);
    const array = result[0].prefer_location.split(",");
    console.log(array);

    res.render("edit/preferences", { prefData: result, id, data: array });
  } catch (error) {
    res.status(500).json({
      message: `Error ouucre while getting data for preference ${error.message}`,
    });
  }
});

app.post("/edit-preference", async (req, res) => {
  try {
    const id = parseInt(req.body.id);
    console.log(req.body);
    const bo = {
      id: "4",
      location: ["remote", "bhavnagar"],
      notice: "2",
      ectc: "1500000",
      cctc: "1200000",
      department: "Designer",
    };

    const [result] = await db.execute(
      "update applicant_preferences set applicant_id = ? , prefer_location = ? , notice_period = ? , expected_ctc = ? , current_ctc = ? , department = ?",
      [
        id,
        req.body.location.join(","),
        parseInt(req.body.notice),
        parseInt(req.body.ectc),
        parseInt(req.body.cctc),
        req.body.department,
      ],
    );

    if (result.affectedRows > 0) {
      res.status(200).json(`Updating was success`);
    } else {
      res.status(200).json(`No record for update`);
    }
  } catch (error) {
    res.status(500).json({
      message: `Error occure while updating: ${error.message}`,
    });
  }
});

app.get("/edit-reference", async (req, res) => {
  try {
    const id = parseInt(req.query.id);
    const [result] = await db.execute(
      "select * from job_references where applicant_id = ? and is_deleted = ?",
      [id, 0],
    );

    res.render("edit/reference", {
      refData: result,
      id: result[0].applicant_id,
    });
  } catch (e) {
    console.log(`Error occure while updating ${e.message}`);
    res.status(500).json({
      message: `Error occure while updating ${e.message}`,
    });
  }
});

app.post("/edit-reference", async (req, res) => {
  try {
    const id = parseInt(req.body.id);
    console.log(req.body);

    const [result] = await db.execute(
      "update job_references set is_deleted  = ? , deleted_at = ? where applicant_id = ?",
      [1, new Date(), id],
    );
    if (result.affectedRows > 0) {
      console.log(`All record with id ${id} is mark as deleted`);
      for (let i = 0; i < req.body.ref_name.length; i++) {
        const [result2] = await db.execute(
          "insert into job_references(applicant_id,reference_name,reference_contact,relation) values(?,?,?,?)",
          [
            id,
            req.body.ref_name[i],
            req.body.ref_contact[i],
            req.body.ref_relation[i],
          ],
        );
      }
    }
    res.status(200).json({
      message: "Update successfull",
    });
  } catch (e) {
    res.status(500).json({
      message: `Error occure while updating references ${e.message}`,
    });
  }
});

app.get("/edit-language", async (req, res) => {
  try {
    const id = parseInt(req.query.id);
    const [result] = await db.execute(
      "select l.name,IFNULL(lk.can_read,0) as can_read,IFNULL(lk.can_write,0) as can_write,IFNULL(lk.can_speak,0) as can_speak from languages l left join language_known lk on l.name = lk.language_name AND lk.applicant_id = ?",
      [id],
    );

    console.log(result, id);

    res.status(200).render("edit/language", {
      lanData: result,
      id,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error while fetching languages ${error.message}`,
    });
  }
});

app.post("/edit-language", async (req, res) => {
  console.log(req.body);

  //   {
  //   id: '4',
  //   lang: [
  //     { name: 'Hindi', read: '1' },
  //     { name: 'English', read: '1', write: '1', speak: '1' },
  //     { name: 'Gujarati', speak: '1' }
  //   ]
  // }
  try {
    const id = parseInt(req.body.id);
    const data = req.body.lang;

    const [result] = await db.execute(
      "DELETE FROM language_known where applicant_id=?",
      [id],
    );

    if (result.affectedRows > 0) {
      console.log(`All old data is deleted`);
    } else {
      return res.status(404).json({
        message: `No record found in the system`,
      });
    }
    const insertData = [];
    data.forEach((ele, index) => {
      let obj = {};
      obj.name = ele.name;
      obj.read = ele.read ? parseInt(ele.read) : 0;
      obj.write = ele.write ? parseInt(ele.write) : 0;
      obj.speak = ele.speak ? parseInt(ele.speak) : 0;
      insertData.push(obj);
    });

    insertData.forEach(async (ele, index) => {
      const [result2] = await db.execute(
        "insert into language_known(applicant_id,language_name,can_read,can_write,can_speak) values(?,?,?,?,?)",
        [id, ele.name, ele.read, ele.write, ele.speak],
      );
    });

    return res.status(202).json({
      message: `Data updation success`,
    });
    // console.log(insertData);
  } catch (error) {
    console.log(`Error occure while updating the languages: ${error.message}`);
    res.status(500).json({
      message: `Error occure while updating language data ${error.message}`,
    });
  }
});

app.get("/edit-skill", async (req, res) => {
  try {
    const id = parseInt(req.query.id);
    const [result, fields, err] = await db.execute(
      "select s.name , IFNULL(tk.is_beginner,0) as beginner , IFNULL(tk.is_advance,0) as intermediate , IFNULL(tk.is_expert,0) as expert from skills s LEFT JOIN technologies_known tk on s.name = tk.technology_name AND applicant_id = ?",
      [id],
    );
    if (!err) {
      res.status(200).render("edit/skills", { techData: result, id });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error occure while fetching techonologies ${error.message}`,
    });
  }
});

app.post("/edit-skill", async (req, res) => {
  try {
    const id = parseInt(req.body.id);

    //     {
    //   id: '4',
    //   tech: [
    //     { name: 'JAVA' },
    //     { name: 'PYTHON', proficiency: 'advance' },
    //     { name: 'PHP', proficiency: 'beginner' },
    //     { name: '.NET', proficiency: 'intermediate' }
    //   ]
    // }

    const [result] = await db.execute(
      "DELETE FROM technologies_known where applicant_id = ?",
      [id],
    );

    if (result.affectedRows > 0) {
      console.log(`Old record deleted succesfully`);
    } else {
      res.status(404).json({
        message: `No record found`,
      });
    }
    const insertData = [];
    const data = req.body.tech;

    data.forEach((ele, index) => {
      let obj = {};
      obj.name = ele.name;
      obj.beginner = ele.proficiency == "beginner" ? 1 : 0;
      obj.intermediate = ele.proficiency == "intermediate" ? 1 : 0;
      obj.expert = ele.proficiency == "expert" ? 1 : 0;
      insertData.push(obj);
    });
    console.log(insertData);
    insertData.forEach(async (ele) => {
      const [result2, fields, err] = await db.execute(
        "insert into technologies_known(applicant_id,technology_name,is_beginner,is_advance,is_expert) values(?,?,?,?,?)",
        [id, ele.name, ele.beginner, ele.intermediate, ele.expert],
      );
      if (err) {
        res.status(500).json({
          message: `Error while inserting new data ${err.message}`,
        });
      }
    });

    res.status(200).json({
      message: `Record updated succesfully`,
    });
    // console.log(req.body);
  } catch (error) {
    console.log(`Error occure while updating techonologies ${error.message}`);
    res.status(500).json({
      message: `Error while updating techonologies ${error.message}`,
    });
  }
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
