const validate = new window.JustValidate("#form");

validate.addField("#fname", [
  { rule: "required", errorMessage: "First Name is required" },
  {
    validator: (value) => /^[A-Za-z]+$/.test(value),
    errorMessage: "Only alphabets allowed",
  },
]);

validate.addField("#lname", [
  { rule: "required", errorMessage: "Last Name is required" },
  {
    validator: (value) => /^[A-Za-z]+$/.test(value),
    errorMessage: "Only alphabets allowed",
  },
]);

validate.addField("#designation", [
  { rule: "required", errorMessage: "Designation is required" },
]);

validate.addField("#fline", [
  { rule: "required", errorMessage: "Address Line 1 required" },
]);

validate.addField("#sline", [
  { rule: "required", errorMessage: "Address Line 2 required" },
]);

validate.addField("#city", [
  { rule: "required", errorMessage: "City required" },
]);

validate.addField("#state", [
  { rule: "required", errorMessage: "State required" },
]);

validate.addField("#zipcode", [
  { rule: "required", errorMessage: "Pincode required" },
  {
    validator: (value) => /^[0-9]{6}$/.test(value),
    errorMessage: "Pincode must be 6 digits",
  },
]);

validate.addField("#phone", [
  { rule: "required", errorMessage: "Phone number required" },
  {
    validator: (value) => /^[0-9]{10}$/.test(value),
    errorMessage: "Phone must be 10 digits",
  },
]);

validate.addRequiredGroup(".radio-group", "Please select gender");

validate.addField("#status", [
  { rule: "required", errorMessage: "Relationship status required" },
]);

validate.addField("#birth", [
  { rule: "required", errorMessage: "Birthdate required" },
  {
    validator: (value) => new Date(value) <= new Date(),
    errorMessage: "Birthdate cannot be future date",
  },
]);

let educationTable = document.getElementById("education-table");
let plusBtn = document.getElementById("e-plus");
let minusBtn = document.getElementById("e-minus");
let index = 2;

// First Row Validation
validate.addField("#course1", [{ rule: "required" }]);
validate.addField("#passYear1", [
  { rule: "required" },
  { rule: "integer" },
  { rule: "minLength", value: 4 },
  { rule: "maxLength", value: 4 },
]);
validate.addField("#uni1", [{ rule: "required" }]);
validate.addField("#res1", [{ rule: "required" }]);

plusBtn.addEventListener("click", () => {
  let newRow = educationTable.insertRow();
  newRow.insertCell(0).innerHTML = `${index}`;
  newRow.insertCell(1).innerHTML = `<input type="text" id="course${index}">`;
  newRow.insertCell(2).innerHTML = `<input type="text" id="passYear${index}">`;
  newRow.insertCell(3).innerHTML = `<input type="text" id="uni${index}">`;
  newRow.insertCell(4).innerHTML = `<input type="text" id="res${index}">`;

  validate.addField(`#course${index}`, [{ rule: "required" }]);
  validate.addField(`#passYear${index}`, [
    { rule: "required" },
    { rule: "integer" },
    { rule: "minLength", value: 4 },
    { rule: "maxLength", value: 4 },
  ]);
  validate.addField(`#uni${index}`, [{ rule: "required" }]);
  validate.addField(`#res${index}`, [{ rule: "required" }]);

  index++;
});

minusBtn.addEventListener("click", () => {
  if (index > 2 && confirm("Delete last education entry?")) {
    educationTable.deleteRow(index - 1);
    index--;
  }
});

let workTable = document.getElementById("work-table");
let wplusBtn = document.getElementById("w-plus");
let wminusBtn = document.getElementById("w-minus");
let windex = 2;

// First Row Validation
validate.addField("#company1", [{ rule: "required" }]);
validate.addField("#from1", [{ rule: "required" }]);
validate.addField("#to1", [{ rule: "required" }]);
validate.addField("#package1", [{ rule: "required" }, { rule: "number" }]);
validate.addField("#reason1", [{ rule: "required" }]);
validate.addField("#refContact1", [
  {
    validator: (value) => /^[0-9]{10}$/.test(value),
    errorMessage: "Must be 10 digits",
  },
]);
validate.addField("#refName1", [{ rule: "required" }]);

wplusBtn.addEventListener("click", () => {
  let newRow = workTable.insertRow();
  newRow.insertCell(0).innerHTML = `${windex}`;
  newRow.insertCell(1).innerHTML = `<input type="text" id="company${windex}">`;
  newRow.insertCell(2).innerHTML = `<input type="date" id="from${windex}">`;
  newRow.insertCell(3).innerHTML = `<input type="date" id="to${windex}">`;
  newRow.insertCell(4).innerHTML = `<input type="text" id="package${windex}">`;
  newRow.insertCell(5).innerHTML = `<input type="text" id="reason${windex}">`;
  newRow.insertCell(6).innerHTML =
    `<input type="text" id="refContact${windex}">`;
  newRow.insertCell(7).innerHTML = `<input type="text" id="refName${windex}">`;

  validate.addField(`#company${windex}`, [{ rule: "required" }]);
  validate.addField(`#from${windex}`, [{ rule: "required" }]);
  validate.addField(`#to${windex}`, [{ rule: "required" }]);
  validate.addField(`#package${windex}`, [
    { rule: "required" },
    { rule: "number" },
  ]);
  validate.addField(`#reason${windex}`, [{ rule: "required" }]);
  validate.addField(`#refContact${windex}`, [
    {
      validator: (value) => /^[0-9]{10}$/.test(value),
      errorMessage: "Must be 10 digits",
    },
  ]);
  validate.addField(`#refName${windex}`, [{ rule: "required" }]);

  windex++;
});

wminusBtn.addEventListener("click", () => {
  if (windex > 2 && confirm("Delete last work entry?")) {
    workTable.deleteRow(windex - 1);
    windex--;
  }
});

let referenceTable = document.getElementById("reference-table");
let rplusBtn = document.getElementById("r-plus");
let rminusBtn = document.getElementById("r-minus");
let rindex = 2;

validate.addField("#referenceName1", [{ rule: "required" }]);
validate.addField("#referenceContact1", [
  {
    validator: (value) => /^[0-9]{10}$/.test(value),
    errorMessage: "Must be 10 digits",
  },
]);
validate.addField("#relation1", [{ rule: "required" }]);

rplusBtn.addEventListener("click", () => {
  let newRow = referenceTable.insertRow();
  newRow.insertCell(0).innerHTML = `${rindex}`;
  newRow.insertCell(1).innerHTML =
    `<input type="text" id="referenceName${rindex}">`;
  newRow.insertCell(2).innerHTML =
    `<input type="text" id="referenceContact${rindex}">`;
  newRow.insertCell(3).innerHTML = `<input type="text" id="relation${rindex}">`;

  validate.addField(`#referenceName${rindex}`, [
    { rule: "required", errorMessage: "Reference name is required" },
  ]);
  validate.addField(`#referenceContact${rindex}`, [
    {
      rule: "required",
      errorMessage: "Reference Phone number is required",
    },
    {
      validator: (value) => /^[0-9]{10}$/.test(value),
      errorMessage: "Must be 10 digits",
    },
  ]);
  validate.addField(`#relation${rindex}`, [
    { rule: "required", errorMessage: "Relation filed is required" },
  ]);

  rindex++;
});

rminusBtn.addEventListener("click", () => {
  if (rindex > 2 && confirm("Delete last reference?")) {
    referenceTable.deleteRow(rindex - 1);
    rindex--;
  }
});

validate.addField("#notice", [
  { rule: "required", errorMessage: "Notice period is required" },
  { rule: "integer", errorMessage: "Notice period should be numaric" },
]);

validate.addField("#ectc", [
  { rule: "required", errorMessage: "Expected CTC is required" },
  { rule: "number", errorMessage: "CTC should be number only" },
]);

validate.addField("#cctc", [
  { rule: "required", errorMessage: "Current CTC is required" },
  { rule: "number", errorMessage: "CTC should be number only" },
]);

validate.addField("#location", [
  {
    validator: () =>
      document.querySelectorAll("#location option:checked").length > 0,
    errorMessage: "Select at least one location",
  },
]);

validate.addField("#department", [
  { rule: "required", errorMessage: "Department is required" },
]);

validate.onSuccess((event) => {
  alert("Form Submitted Successfully!");
});

let language = ["Hindi", "Gujarati", "English"];
let langCheckedArr = {};
let languageTable = document.getElementById("language-table");
language.forEach((ele, index) => {
  let row = languageTable.insertRow();
  row.setAttribute("id", `lanRow${index + 1}`);
  langCheckedArr[`lanCheckBox${index + 1}`] = false;
  row.insertCell(0).innerHTML = `${index + 1}`;
  row.insertCell(1).innerHTML =
    `<input type="checkbox" name="isKnown${index + 1}" onChange = "handleLanguage(this,${index + 1})">${ele}`;
  row.insertCell(2).innerHTML =
    `<input type="hidden" name="read${index + 1}" id="read${index + 1}"></input>`;
  row.insertCell(3).innerHTML =
    `<input type="hidden" name="write${index + 1}" id="write${index + 1}"></input>`;
  row.insertCell(4).innerHTML =
    `<input type="hidden" name="speak${index + 1}" id="speak${index + 1}"></input>`;
});

let techonologies = ["JAVA", "PYTHON", "PHP", ".NET"];

let techonologiesTable = document.getElementById("techonologies-table");
let techonologiesVarArr = {};
techonologies.forEach((ele, index) => {
  let row = techonologiesTable.insertRow();
  techonologiesVarArr[`checkedBox${index + 1}`] = false;
  row.setAttribute("id", `row${index + 1}`);
  row.insertCell(0).innerHTML = `${index + 1}`;
  row.insertCell(1).innerHTML =
    `<input type="checkbox" name="isChecked${index + 1}" onChange="handleCheck(this , ${index + 1})">${ele}`;
  row.insertCell(2).innerHTML =
    `<input  type="hidden" name="beginner${index + 1}" id="beginner${index + 1}"></input>`;
  row.insertCell(3).innerHTML =
    `<input type="hidden" name="intermediate${index + 1}" id="intermediate${index + 1}"></input>`;
  row.insertCell(4).innerHTML =
    `<input type="hidden" name="expert${index + 1}" id="expert${index + 1}"></input>`;
});
// let checkedBox = false;
// Validation for techonologies and   language
function handleCheck(ele, index) {
  if (ele.checked && techonologiesVarArr[`checkedBox${index}`] == false) {
    let row = document.getElementById(`row${index}`);
    document.getElementById(`beginner${index}`).setAttribute("type", "radio");
    document
      .getElementById(`intermediate${index}`)
      .setAttribute("type", "radio");
    document.getElementById(`expert${index}`).setAttribute("type", "radio");
    techonologiesVarArr[`checkedBox${index}`] = true;
  } else {
    document.getElementById(`beginner${index}`).setAttribute("type", "hidden");
    document
      .getElementById(`intermediate${index}`)
      .setAttribute("type", "hidden");
    document.getElementById(`expert${index}`).setAttribute("type", "hidden");
    techonologiesVarArr[`checkedBox${index}`] = false;
  }
}

let lanCheckBox = false;
function handleLanguage(ele, index) {
  if (ele.checked && langCheckedArr[`lanCheckBox${index}`] == false) {
    let row = document.getElementById(`lanRow${index}`);
    document.getElementById(`read${index}`).setAttribute("type", "checkbox");
    document
      .getElementById(`read${index}`)
      .setAttribute("onChange", `handleLanCheckbox(this,${index})`);

    document.getElementById(`write${index}`).setAttribute("type", "checkbox");
    document
      .getElementById(`write${index}`)
      .setAttribute("onChange", `handleLanCheckbox(this,${index})`);

    document.getElementById(`speak${index}`).setAttribute("type", "checkbox");
    document
      .getElementById(`speak${index}`)
      .setAttribute("onChange", `handleLanCheckbox(this,${index})`);

    langCheckedArr[`lanCheckBox${index}`] = true;
  } else {
    document.getElementById(`read${index}`).setAttribute("type", "hidden");
    document.getElementById(`write${index}`).setAttribute("type", "hidden");
    document.getElementById(`speak${index}`).setAttribute("type", "hidden");
    langCheckedArr[`lanCheckBox${index}`] = false;
  }
}
