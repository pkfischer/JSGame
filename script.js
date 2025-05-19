// MAIN CODE
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startX = canvas.width/2;
const startY = 20;
let cueball = makeBall(startX, startY, 10, 0.65, "#a9ff30");

let pingPongBall = makeBall(startX, startY, 8, 0.65, "#fcc449");
let golfBall = makeBall(startX, startY, 12, 0.65, "#e3e3e3");
let pickleball = makeBall(startX, startY, 17, 0.65, "#a9ff30");
let handBall = makeBall(startX, startY, 22, 0.65, "#ff4929");
let softball = makeBall(startX, startY, 27, 0.65, "#ecff1c");
let volleyball = makeBall(startX, startY, 37, 0.65, "#ffa1f4");
let bowlingBall = makeBall(startX, startY, 47, 0.65, "#01024d");
let soccerBall = makeBall(startX, startY, 57, 0.65, "#40cfc3");
let basketball = makeBall(startX, startY, 70, 0.65, "#d98943");
let beachBall = makeBall(startX, startY, 100, 0.65, "#a761f2");


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
let bounciness = 0.65;  // from 0 - 1

setupTouch();
animate();

function makeBall(x, y, radi, bouncy, col){
  const ball = {
    size: radi,
    xPos: x,
    yPos: y,
    xVel: 2,
    yVel: 1,
    xAcc: 0,
    yAcc: 0,
    friction: 0.99,
    bounciness: bouncy,
    color: col,
    draw: function(){
      ctx.beginPath();
      ctx.arc(this.xPos, this.yPos, this.size, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
    },
    update: function(){
      this.xVel += this.xAcc;
      this.yVel += this.yAcc;
      this.xVel *= this.friction;
      this.yVel *= this.friction;
      if (Math.abs(this.xVel) < .5){
        this.xVel = 0;
      }
      if (Math.abs(this.yVel) < .5){
        this.yVel = 0;

      }
      this.xPos += this.xVel;
      this.yPos += this.yVel;
      // bounce
      if (this.xPos < 0){
        this.xPos = 0;
        this.xVel *= -1;
      }
      if (this.yPos < 0){
        this.yPos = 0;
        this.yVel *= -1;
      }
      if (this.xPos > canvas.width){
        this.xPos = canvas.width;
        this.xVel *= -1;
      }
      if (this.yPos > canvas.height){
        this.yPos = canvas.height;
        this.yVel *= -1;
      }
    },
    push: function(dX, dY){
      //this.xVel = dX / 20;
      //this.yVel = dY / 20;
      this.xPos = dX;
      this.yVel += 10;
    }
  }
  return ball
}

function animate(){
  // draw
  ctx.clearRect(0,0,canvas.width,canvas.height);
  cueball.draw();
  cueball.update();
  let num = Math.random()*5+1
  /*if (num == 1){
    pingPongBall.draw();
  } else if (num == 2){
    golfBall.draw();
  } else if (num == 3){
    pickleball.draw();
  } else if (num == 4){
    handBall.draw();
  } else {
    softball.draw();
  }
  */

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
  //cueball.push((touchEndX - touchStartX), (touchEndY - touchStartY));
  cueball.push((touchEndX), (touchEndY - touchStartY));
}










