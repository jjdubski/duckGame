let playerX, playerY;

function setup() {
  createCanvas(400, 800);
  playerX = width / 2;
  playerY = (height / 2) + 30;
}

function draw() {
  background(173, 216, 230);
  rect(playerX, playerY, 30,30)
  playerX = playerX + 1;
  if(playerX > width) {
    playerX = 0;
  }
}