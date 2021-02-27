const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

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
    console.log(event.target.style); 
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));