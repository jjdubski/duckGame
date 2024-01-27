let player;
let platforms = [];

const RIGHT_KEY = 68; // D
const LEFT_KEY = 65; // A
const UP_KEY = 87; // W
const DOWN_KEY = 83; // S

const GROUND_LEVEL = 600;
const PLAYER_HEIGHT = 50;
const PLAYER_WIDTH = 50;

function setup() {
    createCanvas(400, 800);
    player = new Player();
    platforms.push(new Platform());
}

function draw() {
    background(173, 216, 230);
    player.display();
    player.move();
    platforms[0].display();
    // Ground
    rect(0, GROUND_LEVEL, width, height - GROUND_LEVEL);
}

class Platform{
  constructor(){
    this.width = random(50, 100);
    this.height = 20;
    this.x = width - this.width;
    this.y = random(0, GROUND_LEVEL);
  }
  display(){
    rect(this.x, this.y, this.width, this.width);
  }
}

class Player{
  constructor(){
    this.x = width / 2;
    this.y = (height / 2) + 30;
    this.vecY = 0;
    this.onGround = false;
  }
  display(){
     rect(this.x, this.y, PLAYER_WIDTH, PLAYER_HEIGHT);
  }
  move(){
    if (keyIsDown(LEFT_ARROW) || keyIsDown(LEFT_KEY)) {
        this.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(RIGHT_KEY)) {
        this.x += 5;
    }
    if (keyIsDown(UP_ARROW) || keyIsDown(UP_KEY)) {
        // Ensure the player is on the ground (no double jumping)
        if (this.onGround) {
            this.vecY = -10;
            this.onGround = false;
        }
    }

    // Gravity
    if (this.vecY > 0 && this.y >= GROUND_LEVEL - PLAYER_HEIGHT) {
        this.vecY = 0;
        this.y = GROUND_LEVEL - PLAYER_HEIGHT;
        this.onGround = true;
    } else if (this.y < GROUND_LEVEL - PLAYER_HEIGHT) {
        this.vecY += 0.5;
    }
    this.y += this.vecY;
  }
}