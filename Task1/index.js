
    let time = 45;
    let totalTime = 45;
    let remainingTime;
    let score = 0;
    let rows = 2;
    let cols = 2;

let container = document.querySelector("#container");
let table = document.createElement("table");
let scoreText = document.getElementById("score");
let timeText = document.getElementById("time");
let pauseBtn = document.getElementById("pause");
let resumeBtn = document.getElementById("resume");
// let restartBtn = document.getElementById("restart");
table.border = "1";
table.cellSpacing = "4";
table.setAttribute("id","table");
let timeId;
function timer(timeInterval){
    if(time > 0){
        timeId =  setTimeout(() => {
            time = time - 1;
            timeText.textContent = `Time:${time}`;
            if(time === 0){
                pauseBtn.style.display = "none";
                resumeBtn.style.display = "none"
                timeText.style.display="none";
                let tdList = document.querySelectorAll("td");
                tdList.forEach((ele,index) => {
                    ele.style.pointerEvents =  "none"
                })
            }
            timer();
        }, 1000);
    }else{
        clearTimeout(timeId);
    }
}
timer(totalTime);
pauseBtn.addEventListener("click",()=>{
    clearInterval(timeId);
    timeId = null;
    let tdList = document.querySelectorAll("td");
    tdList.forEach((ele,index) => {
        ele.style.pointerEvents =  "none"
    })
     remainingTime = totalTime - time;
})

resumeBtn.addEventListener("click",() => {
    timer(remainingTime);
    let tdList = document.querySelectorAll("td");
    tdList.forEach((ele,index) => {
        ele.style.pointerEvents =  "auto"
    });
})

// restartBtn.addEventListener("click" , () => {
//     time = 5;
//     totalTime = 5;
//     remainingTime = null;
//     score = 0;
//     rows = 2;
//     cols = 2;
    
// })

function createGrid(){
    table.innerHTML = "";
    for(let i = 0 ; i < rows ; i++){
        let row = table.insertRow();
        for(let j = 0 ; j < cols ; j++){
            let cell = row.insertCell(j);
            // let btn = document.createElement("button");
            // btn.setAttribute("type","button");
            // btn.setAttribute("class","btn");
            // cell.appendChild(btn);
        }
    } 
    container.appendChild(table);
    

    handleClick();

}
createGrid();
function handleClick(){
    let tdList = [...document.querySelectorAll("td")];
    let correctBtn = Math.abs(Math.floor(Math.random()*(cols*rows)-1 ));
    console.log("CorrectBtn=",correctBtn);
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);;
    let b = Math.floor(Math.random() * 256);;
    // let a = Math.random();
    let a = getAlpha();
    console.log(`r=${r} g=${g} b=${b} a=${a}`);
    
    tdList.forEach( (ele,index) => {
        if(index === correctBtn){
            
            ele.style.backgroundColor = `rgba(${r},${g},${b},${a})`
        }
        else{
            ele.style.backgroundColor = `rgba(${r},${g},${b},0.4)`
        }
        ele.addEventListener("click" , () => {
            console.log("index",index);
            console.log("compareVal",correctBtn);
            
            if(index === correctBtn){
                if(rows <=8 && cols <= 8){
                }
                cols += 1;
                rows += 1;
                createGrid();
                // else{
                //     createGrid();
                // }
                score++;
                scoreText.textContent = `Score:${score}`
                // handleColor(correctBtn);
            }
        })
    });
}

// function handleColor(specialIndex){
//     let tdList = [...document.querySelectorAll("td")];
//     let r = Math.floor(Math.random() * 256);
//     let g = Math.floor(Math.random() * 256);;
//     let b = Math.floor(Math.random() * 256);;
//     let a = Math.random();
//     console.log(`r=${r} g=${g} b=${b} a=${a}`);
    
//     tdList.forEach( (ele,index) => {
//         console.log(`Color index ${specialIndex} and ele index is ${index}`);
        
//         if(index === specialIndex){
//             ele.style.backgroundColor = `rgba(${r},${g},${b},${a})`
//         }
//         else{
//             ele.style.backgroundColor = `rgb(${r},${g},${b},1)`
//         }
//     })
    

// }

function getAlpha(){
    let alpha = Math.random();
    if(alpha > 0.500000000000000 && alpha < 0.6500000000000000){
        return alpha;
    }
    else{
        return getAlpha();
    }
}
