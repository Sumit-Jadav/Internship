let educationTable = document.getElementById("education-table");
let plusBtn = document.getElementById("e-plus");
let minusBtn = document.getElementById("e-minus");
let index = 2;
plusBtn.addEventListener("click" , () => {
    let newRow = educationTable.insertRow();
    let cell1 = newRow.insertCell(0);
    cell1.innerHTML = `${index}`;
    let cell2 = newRow.insertCell(1);
    cell2.innerHTML = `<input type="text" name="course${index}" id="course${index}">`
    let cell3 = newRow.insertCell(2);
    cell3.innerHTML = ` <input type="text" name="passYear${index}" id="passYear${index}">`
    let cell4 = newRow.insertCell(3);                        
    cell4.innerHTML = `<input type="text" name="uni${index}" id="uni${index}">`
    let cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<input type="text" name="res${index}" id="res${index}">`
    index++;
});
minusBtn.addEventListener("click",() => {
    let ans = confirm("Are you sure you want to delete last entry??");
    
    console.log(ans);
    if(index > 2){
        if(ans){
            educationTable.deleteRow(index - 1);
            index--;
        }
    }
    
});


let workTable = document.getElementById("work-table");
let wplusBtn = document.getElementById("w-plus");
let wminusBtn = document.getElementById("w-minus");
let windex = 2;
wplusBtn.addEventListener("click" , () => {
    let newRow = workTable.insertRow();
    let cell1 = newRow.insertCell(0);
    cell1.innerHTML = `${windex}`;
    let cell2 = newRow.insertCell(1);
    cell2.innerHTML = `<input type="text" name="company${windex}" id="company${windex}">`
    let cell3 = newRow.insertCell(2);
    cell3.innerHTML = `<input type="date" name="from${windex}" id="from${windex}">`
    let cell4 = newRow.insertCell(3);                        
    cell4.innerHTML = `<input type="date" name="to${windex}" id="to${windex}">`
    let cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<input type="text" name="package${windex}" id="package${windex}">`
    let cell6 = newRow.insertCell(5);
    cell6.innerHTML =  `<input type="text" name="reason${windex}" id="reason${windex}">`;
    let cell7 = newRow.insertCell   (6);
    cell7.innerHTML = `<input type="text" name="refContact${windex}" id="refContact${windex}">`
    let cell8 = newRow.insertCell(7);
    cell8.innerHTML = `<input type="text" name="refName${windex}" id="designtaion${windex}">`
    windex++;
});

wminusBtn.addEventListener("click" , () => {
    let ans = confirm("Are you sure you want to delete last entry??");
    
    console.log(ans);
    if(windex > 2){
        if(ans){
            workTable.deleteRow(windex - 1);
            windex--;
        }
    }
})



let language = ["Hindi" , "Gujarati" , "English"];

let languageTable = document.getElementById("language-table");
language.forEach((ele,index) => {
    let row = languageTable.insertRow();
    row.insertCell(0).innerHTML = `${index + 1}`;
    row.insertCell(1).innerHTML = `<input type="checkbox" name="isKnown${index+1}">${ele}`;
    row.insertCell(2).innerHTML = `<input type="checkbox" name="read${index+1}" id="read${index+1}"></input>`
    row.insertCell(3).innerHTML = `<input type="checkbox" name="write${index+1}" id="write${index+1}"></input>`
    row.insertCell(4).innerHTML = `<input type="checkbox" name="speak${index+1}" id="speak${index+1}"></input>`
})



let techonologies = ["JAVA","PYTHON","PHP",".NET"];

let techonologiesTable  =document.getElementById("techonologies-table");
techonologies.forEach((ele,index) => {
    let row = techonologiesTable.insertRow();
    row.insertCell(0).innerHTML = `${index + 1}`;
    row.insertCell(1).innerHTML = `<input type="checkbox" name="isChecked${index+1}">${ele}`;
    row.insertCell(2).innerHTML = `<input type="checkbox" name="beginner${index+1}" id="beginner${index+1}"></input>`
    row.insertCell(3).innerHTML = `<input type="checkbox" name="intermediate${index+1}" id="intermediate${index+1}"></input>`
    row.insertCell(4).innerHTML = `<input type="checkbox" name="expert${index+1}" id="expert${index+1}"></input>`
})












let referenceTable = document.getElementById("reference-table");
let rplusBtn = document.getElementById("r-plus");
let rminusBtn = document.getElementById("r-minus");
let rindex = 2;
rplusBtn.addEventListener("click" , () => {
    let newRow = referenceTable.insertRow();
    let cell1 = newRow.insertCell(0);
    cell1.innerHTML = `${rindex}`;
    let cell2 = newRow.insertCell(1);
    cell2.innerHTML = `<input type="text" name="referenceName${rindex}" id="referenceName${rindex}">`
    let cell3 = newRow.insertCell(2);
    cell3.innerHTML = `<input type="text" name="referenceContact${rindex}" id="referenceContact${rindex}">`
    let cell4 = newRow.insertCell(3);
    cell4.innerHTML = `<input type="text" name="relation${index}" id="relation${index}">`
    rindex++;
});

rminusBtn.addEventListener("click" , () => {
    let ans = confirm("Are you sure you want to delete last entry??");
    
    console.log(ans);
    if(rindex > 2){
        if(ans){
            referenceTable.deleteRow(rindex - 1);
            rindex--;
        }
    }
})
