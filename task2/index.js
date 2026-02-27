let table = document.createElement("table");
let body = document.getElementsByTagName("body");
function generateTable(rows,cols) {
    for(let i = 0 ; i < rows ; i++){
        let row = table.insertRow();
        for(let j = 0 ; j < cols ; j++){
            let cell = row.insertCell();
        }
    }
    table.cellSpacing = "2";
    body[0].appendChild(table);
    
}

function generateTrafficLights(appendEle){
   let trafficlightContaier = document.createElement("div");
   trafficlightContaier.setAttribute("class","traffic-contaier");
   for(let i = 0 ; i < 3 ; i++){
    let light = document.createElement("div");
    light.setAttribute("class","light");
    trafficlightContaier.appendChild(light);
   } 
   appendEle.appendChild(trafficlightContaier);
   assignLightClasses(trafficlightContaier);
}

function generateLightsInCell(){
    let tdList = document.querySelectorAll("td");
    tdList.forEach((ele,index) => {
        if(index == 1 || index == 3 || index == 5 || index == 7){
            
            generateTrafficLights(ele);
            assignLightClasses();
        }
    })
}

function assignLightClasses(ele){
    let lightList = document.querySelectorAll(".light");
    lightList.forEach((ele , index) => {
        if(index == 0 || index == 3 || index == 6 || index == 9){
            ele.classList.add("red");
        }
        else if(index == 1 || index == 4 || index == 7 || index == 10){
             ele.classList.add("yellow");

        }
        else{
            ele.classList.add("green");
        }
    })
}


function setTimer(ele,time,color){
    let tdList = document.querySelectorAll("td");
    tdList.forEach((ele,index) => {
        if(index == 1 || index == 3 || index == 5 || index == 7){
            setTimeout(() => {
                
            }, 5000);
        
        }
    })
}



generateTable(3,3);
generateLightsInCell();
