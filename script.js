// MAIN CODE
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

// physics variables, but best practce is to create an object to hold these
let xPos = 100;
let yPos = 200;
let size = 30;
let xVel = 0;
let yVel = 0;
let xAcc = 0;
let yAcc = 0.1;        // gravity
let bounciness = 0.25;  // from 0 - 1

setupTouch();
animate();


function animate(){
  // draw
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawChar(xPos, yPos);
  
  // update
  xPos += xVel;
  yPos += yVel;
  xVel += xAcc;
  yVel += yAcc;
  
  // update collisions
  if (yPos + size > canvas.height){
    yVel = -yVel * bounciness;
    yPos = canvas.height - size;
  }
  if (yPos - size < 0){
    yVel = -yVel;
  }
  if (xPos + size > canvas.width){
    xVel = -xVel;
  }
  if (xPos - size < 0){
    xVel = -xVel;
  }
  
  // repeat
  window.requestAnimationFrame(animate);
}

function drawChar(x, y) {
  // body
  ctx.beginPath();
  ctx.arc(x, y, 30, 0, 2 * Math.PI);
  ctx.fillStyle = "#003388"
  ctx.fill();
  // left eye
  ctx.beginPath();
  ctx.arc(x - 15, y - 10, 12, 0, 2 * Math.PI);
  ctx.fillStyle = "#ffffff"
  ctx.fill();
  // left pupil
  ctx.beginPath();
  ctx.arc(x - 15, y - 5, 6, 0, 2 * Math.PI);
  ctx.fillStyle = "#000000"
  ctx.fill();
  // right eye
  ctx.beginPath();
  ctx.arc(x + 15, y - 10, 12, 0, 2 * Math.PI);
  ctx.fillStyle = "#ffffff"
  ctx.fill();
  // right pupil
  ctx.beginPath();
  ctx.arc(x + 15, y - 5, 6, 0, 2 * Math.PI);
  ctx.fillStyle = "#000000"
  ctx.fill();
  // nose
  ctx.beginPath();
  ctx.arc(x, y + 4, 5, 0, 2 * Math.PI);
  ctx.fillStyle = "#FF8888"
  ctx.fill();
  // mouth
  ctx.beginPath();
  ctx.arc(x, y - 10, 30, 1.2, 2);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#FF8888";
  ctx.stroke();
}

function setupTouch() {
  document.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  });
  document.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    processTouch();
  });
}

function processTouch() {
  xVel += (touchEndX - touchStartX) / 20;
  yVel += (touchEndY - touchStartY) / 20;
}










