let result = document.getElementById("result");
let click = document.getElementById("click");
let dbclick = document.getElementById("dbclick");
let mouseout = document.getElementById("mouseout");
let mouseover = document.getElementById("mouseover");
let mousemove = document.getElementById("mousemove");
let mouseup = document.getElementById("mouseup");
let mousedown = document.getElementById("mousedown");
let wheel = document.getElementById("wheel");
let context = document.getElementById("context");
let focus = document.getElementById("focus");
let blur = document.getElementById("blur");
let changeEvent = document.getElementById("changeEvent");
let inputEvent = document.getElementById("inputEvent");
let keyPress = document.getElementById("keyPressEvent");
let keyUp = document.getElementById("keyUpEvent");
let keyDown = document.getElementById("keyDownEvent");
let btn = document.getElementById("btn");
let after = document.getElementById("after");
let beforeBtn = document.getElementById("before-btn");
let appendBtn = document.getElementById("appendBtn");
let appendChildBtn = document.getElementById("appendChildBtn");
let errorEle = document.getElementById("errorEvent");
let copyEle = document.getElementById("copyEle");
let cutEle = document.getElementById("cutEle");
let pasteEle = document.getElementById("pasteEle");
click.addEventListener("click", () => {
  result.innerText = `Click event triggered`;
});
dbclick.addEventListener("dblclick", () => {
  result.innerText = `Double Click event Occure`;
});
mouseout.addEventListener("mouseout", () => {
  result.innerText = "mouse is out of cell";
});
mouseover.addEventListener("mouseover", () => {
  result.innerText = `mouse is over the cell`;
});
mousemove.addEventListener("mousemove", (e) => {
  result.innerText = `Mouse pointer at X:${e.clientX} and Y:${e.clientY}`;
});
mouseup.addEventListener("mouseup", (e) => {
  result.innerText = `Mouse button is relased`;
});
mousedown.addEventListener("mousedown", () => {
  result.innerText = `Mouse button is pressed `;
});
mousedown.addEventListener(
  "mouseup",
  () => (result.innerText = `Mouse button is released`),
);
wheel.addEventListener(
  "wheel",
  () => (result.innerText = `Mouse wheel scrolled`),
);
context.addEventListener("contextmenu", () => {
  result.innerText = "ContextMenu is opened";
});
focus.addEventListener("focus", () => {
  focus.style.backgroundColor = "green";
});
blur.addEventListener("blur", () => {
  blur.style.backgroundColor = "grey";
});
changeEvent.addEventListener("change", (e) => {
  result.innerText = `Value is changed: ${e.target.value}`;
});
inputEvent.addEventListener("input", (e) => {
  result.innerText = `Input changed:${e.target.value}`;
});
keyPress.addEventListener("keypress", (e) => {
  console.log(e);

  result.innerText = `Key pressed:- ${e.key}`;
});
keyUp.addEventListener("keyup", (e) => {
  result.innerText = `Key is released:- ${e.key}`;
});
keyDown.addEventListener("keydown", (e) => {
  result.innerText = `Key is pressed :- ${e.key}`;
});
btn.addEventListener("click", () => {
  result.after("hello");
});
beforeBtn.addEventListener("click", () => {
  result.before("This is before text");
});
appendBtn.addEventListener("click", () => {
  result.append("This is appended text!!!!");
});
appendChildBtn.addEventListener("click", () => {
  let spanTag = document.createElement("span");
  spanTag.innerText = "This is child";
  result.appendChild(spanTag);
});
errorEle.addEventListener("error", (e) => {
  // result.innerText = `Error occure while loading the image`;
  alert("Error occure while loading the image");
});

window.addEventListener("resize", (e) => {
  alert("You have changed the size of window");
});

copyEle.addEventListener("copy", (e) => {
  let selectedTxt = document.getSelection().toString();
  // console.log(e);
  alert(`User copied: ${selectedTxt}`);
});
cutEle.addEventListener("cut", (e) => {
  let selectedTxt = document.getSelection().toString();
  result.innerText = `User cut:- ${selectedTxt}`;
});
pasteEle.addEventListener("paste", (e) => {
  let selectedTxt = e.clipboardData.getData("text/plain");
  result.innerText = `You have pasted:- ${selectedTxt}`;
});
