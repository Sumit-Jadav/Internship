let container = document.querySelector(".container");
let turn = 'X';
let winPlayer = "draw";
let drawCount = 0;
const boxesList = [...document.querySelectorAll(".box")];
const winingCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 4, 6],
    [8, 4, 0],
    [2, 5, 8]
]
const xarray = [];
const oarray = [];
let board = [];
let xindex = 1;
let oindex = 1;
boxesList.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (turn === 'X') {
            box.innerText = "X";
            turn = "O";
            board[index] = "X";
            xarray[xindex++] = index;
            drawCount++;
            box.style.pointerEvents = "none";
            checkifWin("X");
        } else {
            box.innerText = "O";
            turn = "X";
            board[index] = "O";
            oarray[oindex++] = index;
            drawCount++;
            box.style.pointerEvents = "none";
            checkifWin("O"); 
        }
    })
})


function checkifWin(symbol) {
    xarray.sort();
    oarray.sort();
    for(condition of winingCondition){
        let [a,b,c] = condition;
        if(board[a] == symbol && board[b] == symbol && board[c] == symbol){
            winPlayer = symbol;
        }
    }
    if(winPlayer == "X"){
        alert("X wins!!!");
        location.reload();
    }
    if(winPlayer == "O"){
        alert("O wins");
        location.reload();
    }
    if(drawCount == 9 && winPlayer == "draw"){
        alert("Match is draw!!");
        location.reload();
    }
}




