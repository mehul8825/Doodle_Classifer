const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set background to white
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Set stroke settings
ctx.strokeStyle = "black";
ctx.lineWidth = 15;
ctx.lineCap = "round";

let drawing = false;

canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  ctx.beginPath();
  const { x, y } = getMousePos(e);
  ctx.moveTo(x, y);
});

canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  const { x, y } = getMousePos(e);
  ctx.lineTo(x, y);
  ctx.stroke();
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
  ctx.closePath();
});

canvas.addEventListener("mouseout", () => {
  drawing = false;
  ctx.closePath();
});

function getMousePos(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  document.getElementById('result').innerText = '';
}
