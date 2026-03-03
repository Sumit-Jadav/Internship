let educationTable = document.getElementById("education-table");
let plusBtn = document.getElementById("e-plus");
let minusBtn = document.getElementById("e-minus");
let index = 2;
plusBtn.addEventListener("click", () => {
  let newRow = educationTable.insertRow();
  let cell1 = newRow.insertCell(0);
  cell1.innerHTML = `${index}`;
  let cell2 = newRow.insertCell(1);
  cell2.innerHTML = `<input type="text" name="course${index}" class="course" id="course${index}">`;
  let cell3 = newRow.insertCell(2);
  cell3.innerHTML = ` <input type="text" class="passyear" name="passYear${index}" id="passYear${index}">`;
  let cell4 = newRow.insertCell(3);
  cell4.innerHTML = `<input type="text" name="uni${index}" class="univercity" id="uni${index}">`;
  let cell5 = newRow.insertCell(4);
  cell5.innerHTML = `<input type="text" name="res${index}" class="result" id="res${index}">`;
  index++;
});
minusBtn.addEventListener("click", () => {
  let ans = confirm("Are you sure you want to delete last entry??");

  console.log(ans);
  if (index > 2) {
    if (ans) {
      educationTable.deleteRow(index - 1);
      index--;
    }
  }
});

let workTable = document.getElementById("work-table");
let wplusBtn = document.getElementById("w-plus");
let wminusBtn = document.getElementById("w-minus");
let windex = 2;
wplusBtn.addEventListener("click", () => {
  let newRow = workTable.insertRow();
  let cell1 = newRow.insertCell(0);
  cell1.innerHTML = `${windex}`;
  let cell2 = newRow.insertCell(1);
  cell2.innerHTML = `<input type="text" name="company${windex}" id="company${windex}">`;
  let cell3 = newRow.insertCell(2);
  cell3.innerHTML = `<input type="date" name="from${windex}" id="from${windex}">`;
  let cell4 = newRow.insertCell(3);
  cell4.innerHTML = `<input type="date" name="to${windex}" id="to${windex}">`;
  let cell5 = newRow.insertCell(4);
  cell5.innerHTML = `<input type="text" name="package${windex}" id="package${windex}">`;
  let cell6 = newRow.insertCell(5);
  cell6.innerHTML = `<input type="text" name="reason${windex}" id="reason${windex}">`;
  let cell7 = newRow.insertCell(6);
  cell7.innerHTML = `<input type="text" name="refContact${windex}" id="refContact${windex}">`;
  let cell8 = newRow.insertCell(7);
  cell8.innerHTML = `<input type="text" name="refName${windex}" id="designtaion${windex}">`;
  windex++;
});

wminusBtn.addEventListener("click", () => {
  let ans = confirm("Are you sure you want to delete last entry??");

  console.log(ans);
  if (windex > 2) {
    if (ans) {
      workTable.deleteRow(windex - 1);
      windex--;
    }
  }
});

let language = ["Hindi", "Gujarati", "English"];

let languageTable = document.getElementById("language-table");
language.forEach((ele, index) => {
  let row = languageTable.insertRow();
  row.insertCell(0).innerHTML = `${index + 1}`;
  row.insertCell(1).innerHTML =
    `<input type="checkbox" name="isKnown${index + 1}">${ele}`;
  row.insertCell(2).innerHTML =
    `<input type="checkbox" name="read${index + 1}" id="read${index + 1}"></input>`;
  row.insertCell(3).innerHTML =
    `<input type="checkbox" name="write${index + 1}" id="write${index + 1}"></input>`;
  row.insertCell(4).innerHTML =
    `<input type="checkbox" name="speak${index + 1}" id="speak${index + 1}"></input>`;
});

let techonologies = ["JAVA", "PYTHON", "PHP", ".NET"];

let techonologiesTable = document.getElementById("techonologies-table");
techonologies.forEach((ele, index) => {
  let row = techonologiesTable.insertRow();
  row.insertCell(0).innerHTML = `${index + 1}`;
  row.insertCell(1).innerHTML =
    `<input type="checkbox" name="isChecked${index + 1}">${ele}`;
  row.insertCell(2).innerHTML =
    `<input type="checkbox" name="beginner${index + 1}" id="beginner${index + 1}"></input>`;
  row.insertCell(3).innerHTML =
    `<input type="checkbox" name="intermediate${index + 1}" id="intermediate${index + 1}"></input>`;
  row.insertCell(4).innerHTML =
    `<input type="checkbox" name="expert${index + 1}" id="expert${index + 1}"></input>`;
});

let referenceTable = document.getElementById("reference-table");
let rplusBtn = document.getElementById("r-plus");
let rminusBtn = document.getElementById("r-minus");
let rindex = 2;
rplusBtn.addEventListener("click", () => {
  let newRow = referenceTable.insertRow();
  let cell1 = newRow.insertCell(0);
  cell1.innerHTML = `${rindex}`;
  let cell2 = newRow.insertCell(1);
  cell2.innerHTML = `<input type="text" name="referenceName${rindex}" id="referenceName${rindex}">`;
  let cell3 = newRow.insertCell(2);
  cell3.innerHTML = `<input type="text" name="referenceContact${rindex}" id="referenceContact${rindex}">`;
  let cell4 = newRow.insertCell(3);
  cell4.innerHTML = `<input type="text" name="relation${rindex}" id="relation${rindex}">`;
  rindex++;
});

rminusBtn.addEventListener("click", () => {
  let ans = confirm("Are you sure you want to delete last entry??");

  console.log(ans);
  if (rindex > 2) {
    if (ans) {
      referenceTable.deleteRow(rindex - 1);
      rindex--;
    }
  }
});

// Validation of the form fields

let form = document.forms[0];
const validate = new window.JustValidate("#form");

// let submitBtn = document.getElementById("submit");
// submitBtn.addEventListener("click", () => {
//   let fname = form["fname"].value;
//   let lname = form["lname"].value;
//   let designtaion = form["designation"].value;
//   let add1 = form["fline"].value;
//   let add2 = form["sline"].value;
//   let city = form["city"].value;
//   let state = form["state"].value;
//   let zipcode = form["zipcode"].value;
//   let status = form["status"].value;
//   let birthdate = form["birth"].value;

//   if (
//     fname == "" ||
//     lname == "" ||
//     designtaion == "" ||
//     add1 == "" ||
//     add2 == "" ||
//     city == "" ||
//     state == "" ||
//     zipcode == "" ||
//     status == "" ||
//     birthdate == ""
//   ) {
//     alert("Some Fields are empty!!");
//   }
// });
const today = new Date();
const formattedDate = [
  String(today.getDate()).padStart(2, "0"),
  String(today.getMonth() + 1).padStart(2, "0"),
  today.getFullYear(),
].join("-");
validate.addField("#fname", [
  {
    rule: "required",
    errorMessage: "First Name is required",
  },
  {
    validator: (value) => {
      const regex = /^[A-Za-z]+$/;
      return regex.test(value);
    },
    errorMessage: "Name should only contain alphabets",
  },
]);
validate.addField("#lname", [
  { rule: "required", errorMessage: "Last Name is required" },
  {
    validator: (value) => {
      const regex = /^[A-Za-z]+$/;
      return regex.test(value);
    },
    errorMessage: "Name should only contain alphabets",
  },
]);
validate.addField("#designation", [
  { rule: "required", errorMessage: "Designation is required" },
]);
validate.addField("#fline", [
  { rule: "required", errorMessage: "Address first line empty" },
]);
validate.addField("#sline", [
  { rule: "required", errorMessage: "Address second line empty" },
]);
validate.addField("#zipcode", [
  { rule: "required", errorMessage: "Pincode required" },
  {
    validator: (value) => {
      const regex = /^[0-9]+$/;
      return regex.test(value);
    },
    errorMessage: "Pincode should only contain digits",
  },
  {
    rule: "minLength",
    value: 6,
    errorMessage: "Pincode should have 6 digits",
  },
  {
    rule: "maxLength",
    value: 6,
    errorMessage: "Pincode should have 6 digits",
  },
]);
validate.addField("#city", [
  { rule: "required", errorMessage: "City is empty" },
]);
validate.addField("#state", [
  {
    rule: "required",
    errorMessage: "State is required",
  },
]);
validate.addField("#status", [
  { rule: "required", errorMessage: "Status is required" },
]);
validate.addField("#birth", [
  { rule: "required", errorMessage: "Birthdate is required" },
  {
    plugin: JustValidatePluginDate(() => ({
      format: "dd-mm-yyyy",
      isBeforeOrEqual: formattedDate + "",
    })),
    errorMessage: "Date is not valid",
  },
]);
validate.addField("#phone", [
  { rule: "required", errorMessage: "Phone number is empty" },
]);
validate.addRequiredGroup(".radio-group", "Please select gender");

validate.addField(".course", [
  {
    rule: "required",
    errorMessage: "Course is required",
  },
]);
validate.addField(".passyear", [
  {
    rule: "required",
  },
  {
    rule: "integer",
    errorMessage: "Year can't contain alphabets",
  },
  {
    rule: "minLength",
    value: 4,
    errorMessage: "year should be in 'yyyy' format",
  },
  {
    rule: "maxLength",
    value: 4,
    errorMessage: "year should be in 'yyyy' format",
  },
]);
