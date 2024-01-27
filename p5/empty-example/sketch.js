let player, platform;
let viewportX = 0;
let platforms = [];
let enemyList = [];

const BASE_HP = 5;

const RIGHT_KEY = 68; // D
const LEFT_KEY = 65; // A
const UP_KEY = 87; // W
const DOWN_KEY = 83; // S

const GROUND_LEVEL = 600;
const PLAYER_HEIGHT = 50;
const PLAYER_WIDTH = 50;

function preload() {
    // Load images and sounds here
    imgCrocClosed = loadImage('assets/croc_closed.png');
    imgCrocOpen = loadImage('assets/croc_open.png');

    imgTurtleClosed = loadImage('assets/turtle_closed.png');
    imgTurtleOpen = loadImage('assets/turtle_open.png');
}

function setup() {
    createCanvas(400, 800);
    player = new Player();
    croc = new Croc();
    enemyList.push(croc);
    platforms.push(new Platform());
    platform = new Platform(200);
}

function draw() {
    background(173, 216, 230);

    player.display();
    player.move();
    platforms[0].display();
    croc.display();


    // Platform
    platform.display();

    // Ground
    fill(0, 255, 0);
    rect(0, GROUND_LEVEL, width, height - GROUND_LEVEL);
}

class Platform{
  constructor(){
    this.width = random(50, 100);
    this.height = 20;
    this.x = width - this.width;
    this.y = random(0, GROUND_LEVEL - this.height);
  }
  display(){
    fill(151,87,43);
    rect(this.x, this.y, this.width, this.height);
  }
class Platform {
    constructor(x) {
        this.x = x;
        this.y = random(GROUND_LEVEL - 100, GROUND_LEVEL);
        this.width = random(50, 100);
        this.height = 10;
    }
    display() {
        fill(0, 255, 0);
        rect(this.x - viewportX, this.y, this.width, this.height);
    }
}

class Player{
  constructor(){
    this.x = width / 2;
    this.y = (height / 2) + 30;
    this.vecY = 0;
    this.onGround = false;
    this.hp = BASE_HP;
  }
  display(){ 
    fill(255, 255, 255)
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
class Player {
    constructor() {
        this.x = width / 2;
        this.y = (height / 2) + 30;
        this.vecY = 0;
        this.onGround = false;
    }
    display() {
        fill(255, 255, 255);
        rect(this.x - viewportX, this.y, PLAYER_WIDTH, PLAYER_HEIGHT);
    }
    move() {
        if (keyIsDown(LEFT_ARROW) || keyIsDown(LEFT_KEY)) {
            if (!this.leftCheck(platform)) {
                this.x -= 5;
            }
        }
        if (keyIsDown(RIGHT_ARROW) || keyIsDown(RIGHT_KEY)) {
            if (!this.rightCheck(platform)) {
                this.x += 5;
            }
        }
        if (keyIsDown(UP_ARROW) || keyIsDown(UP_KEY)) {
            // Ensure the player is on the ground (no double jumping)
            if (this.onGround) {
                this.vecY = -10;
                this.onGround = false;
            }
        }

        // Update viewport
        viewportX = max(0, this.x - width / 2);

        // Gravity
        if (this.vecY > 0 && this.groundCheck(platform)) {
            this.vecY = 0;
            this.onGround = true; 
        } else if (!this.groundCheck(platform)) {
            this.vecY += 0.5;
            this.onGround = false;

            // Check if player is hitting the top of the platform
            if (this.topCheck(platform)) {
                this.vecY = Math.abs(this.vecY * 0.4);
            }
        }
        this.y += this.vecY;
    }
    rightCheck(platform) {
        return this.y + PLAYER_HEIGHT > platform.y && this.y <= platform.y + platform.height && this.x + PLAYER_WIDTH >= platform.x && this.x + PLAYER_WIDTH + 10 <= platform.x + platform.width;
    }
    leftCheck(platform) {
        return this.y + PLAYER_HEIGHT > platform.y && this.y <= platform.y + platform.height && this.x <= platform.x + platform.width && this.x >= platform.x;
    }
    groundCheck(platform) {
        if (this.y + PLAYER_HEIGHT >= GROUND_LEVEL) {
            this.y = GROUND_LEVEL - PLAYER_HEIGHT;
            return true;
        }
        if (this.y + PLAYER_HEIGHT >= platform.y && this.y + PLAYER_HEIGHT <= platform.y + platform.height && this.x + PLAYER_WIDTH >= platform.x && this.x <= platform.x + platform.width) {
            this.y = platform.y - PLAYER_HEIGHT;
            return true;
        }
        return false;
    }
    topCheck(platform) {
        return this.y >= platform.y && this.y <= platform.y + platform.height && this.x + PLAYER_WIDTH >= platform.x && this.x <= platform.x + platform.width;
    }
}

class Enemy{
  constructor(){
    this.x = 0;
    this.y = 0;
    this.damage;
    this.hp;
  }
}

class Croc extends Enemy{
  constructor(){
    super();
    this.x = width;
    this.y = GROUND_LEVEL - 40;
    this.damage = 1;
    this.hp = 1;
  }
  display(){
    image(imgCrocClosed, this.x-100, this.y, 100, 50);
    noFill();
    rect(this.x, this.y, 50, 50);
  }
  move(){
    this.x -= 5;
  }
}