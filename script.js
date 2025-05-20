// MAIN CODE
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startX = canvas.width/2;
const startY = 20;
let cueball = makeBall(startX, startY, "#a9ff30");
let table = makeTable();


let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;


setupTouch();
animate();

function makeBall(x, y, col){
  const ball = {
    size: 10,
    xPos: x,
    yPos: y,
    xVel: 2,
    yVel: 1,
    xAcc: 0,
    yAcc: 0,
    friction: 0.99,
    color: col,
    draw: function(){
      ctx.beginPath();
      ctx.arc(this.xPos, this.yPos, this.size, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
    },
    update: function(){
      if (table.pocketable(this.xPos, this.yPos)){
        this.xAcc = 0;
        this.yAcc = 0;
        this.xVel = 0;
        this.yVel = 0;
        this.xPos = -100;
        this.yPos = -100;
      }
      this.xVel += this.xAcc;
      this.yVel += this.yAcc;
      this.xVel *= this.friction;
      this.yVel *= this.friction;
      if (Math.hypot(this.xVel, this.yVel) < 0.1){
        this.xVel = 0;
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
      this.xVel = dX / 20;
      this.yVel = dY / 20;
    }
  }
  return ball
}

function makeTable(){
  const table = 
  { 
    pocketRadius: 15,
    pocketColor: "#222222",
    pockets : [
      {x : 4, y : 4},
      {x : 4, y : canvas.height / 2},
      {x : 4, y : canvas.height - 4},
      {x : canvas.width - 4, y : 4},
      {x : canvas.width - 4, y : canvas.height / 2},
      {x : canvas.width - 4, y : canvas.height - 4}
    ],
    draw: function(){
      ctx.fillStyle  = "#008000";
      ctx.fillRect(0,0,canvas.width,canvas.height);
      for (const loc of this.pockets){
        ctx.beginPath();
        ctx.arc(loc.x, loc.y, this.pocketRadius, 0, 2 * Math.PI);
        ctx.fillStyle = this.pocketColor;
        ctx.fill();
      }
    },
    pocketable: function(ballX, ballY){
      for (const loc of this.pockets){
        if( Math.hypot(ballX - loc.x, ballY - loc.y) < this.radius){
          console.log("Pocketed");
          return true;
        }
      }
      return false;
    }
  }
  return table;
}

function animate(){
  // draw
  table.draw();
  cueball.draw();
  cueball.update();

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










