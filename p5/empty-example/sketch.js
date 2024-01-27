let playerX, playerY;

function setup() {
  createCanvas(400, 800);
  playerX = width / 2;
  playerY = height / 2;
}

function draw() {
  background(220);
  circle(playerX, playerY, 20)
}