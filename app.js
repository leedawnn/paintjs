const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const modeBtn = document.getElementById("jsMode");
const clearBtn = document.getElementsByClassName("jsClear"); 
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 540;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white"; // 채우기 모드에서 배경 색상 디폴트 값
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR; // 펜 색상 디폴트 값(검정)
ctx.fillStyle = INITIAL_COLOR; 
ctx.lineWidth = 2.5; // 펜 굵기 디폴트 값

let painting = false;
let filling = false;
let clear = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) { // 모든 움직임을 감지하고, 라인을 만든다.
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath(); // 선을 그리기 위한 메서드 호출
        ctx.moveTo(x, y); // 시작점을 (x,y)좌표로 이동
    } else {
        ctx.lineTo(x, y); // 마지막 점을 지정된 (x,y) 좌표에 직선으로 연결
        ctx.stroke(); // 현재 획 스타일로 획 긋기
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color; 
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        modeBtn.innerText = "Fill";
    } else {
        filling = true;
        modeBtn.innerText = "Paint";
    }
}

function clearCanvasClick() {
    if(!clear) {
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    } else {
        ctx.beginPath();
    }
}

function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleContextMenu(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJS[🎨]";
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContextMenu);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(modeBtn) {
    modeBtn.addEventListener("click", handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}

if(clearBtn) {
    clearBtn.addEventListener("click", clearCanvasClick);
}