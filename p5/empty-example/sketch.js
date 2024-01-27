let player, platform;
let croc, turtle;
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
    //croc = new Croc();
    //enemyList.push(croc);
    turtle = new Turtle();
    enemyList.push(turtle);

    levelGeneration(100);
}

function draw() {
    background(173, 216, 230);

    player.display();
    player.move();

    platforms.forEach(platform => {
        // Only display platforms that are on the screen
        if (platform.x + platform.width >= viewportX && platform.x <= viewportX + width) {
            platform.display();
        }
    });
    //croc.display();
    turtle.display();
    // Ground
    fill(0, 255, 0);
    rect(0, GROUND_LEVEL, width, height - GROUND_LEVEL);
}

function levelGeneration(maxSteps) {
    let nextX = 0;
    let nextY = GROUND_LEVEL - 100;
    let jumpDistance = 130;

    for (let i = 0; i < maxSteps; i++) {
        let newPlatform = new Platform(nextX, nextY);
        platforms.push(newPlatform);
        nextX += newPlatform.width;

        // Put the next step within a jumping distance from the previous step
        let angle = random(-PI / 3, PI / 3);
        nextX += jumpDistance * cos(angle);
        nextY = min(max(PLAYER_HEIGHT + 100, nextY + jumpDistance * sin(angle)), GROUND_LEVEL - PLAYER_HEIGHT);
    }
}

class Platform {
    constructor(x, y) {
        this.width = random(50, 100);
        this.height = 20;
        this.x = x;
        this.y = y;
    }
    display() {
        fill(151, 87, 43);
        rect(this.x - viewportX, this.y, this.width, this.height);
    }
}

class Player {
    constructor() {
        this.x = width / 2;
        this.y = (height / 2) + 30;
        this.vecY = 0;
        this.onGround = false;
        this.topCheck = false;
        this.leftCheck = false;
        this.rightCheck = false;
    }
    display() {
        fill(255, 255, 255);
        rect(this.x - viewportX, this.y, PLAYER_WIDTH, PLAYER_HEIGHT);
    }
    move() {
        // Collision check
        this.collisionCheck();

        // Update viewport
        viewportX = max(0, this.x - width / 2);

        // Gravity
        if (this.vecY > 0 && this.onGround) {
            this.vecY = 0;
        } else if (!this.onGround) {
            this.vecY += 0.5;

            // Check if player is hitting the top of the platform
            if (this.topCheck) {
                this.vecY = Math.abs(this.vecY * 0.2);
            }
        }
        this.y += this.vecY;

        if (keyIsDown(LEFT_ARROW) || keyIsDown(LEFT_KEY)) {
            if (!this.leftCheck) {
                this.x -= 5;
            }
        }
        if (keyIsDown(RIGHT_ARROW) || keyIsDown(RIGHT_KEY)) {
            if (!this.rightCheck) {
                this.x += 5;
            }
        }
        if (keyIsDown(UP_ARROW) || keyIsDown(UP_KEY)) {
            // Ensure the player is on the ground (no double jumping)
            if (this.onGround) {
                this.vecY = -10;
            }
        }
    }
    collisionCheck() {
        // Reset collision checks
        this.topCheck = false;
        this.leftCheck = false;
        this.rightCheck = false;
        this.onGround = false;

        // Ground check
        if (this.y + PLAYER_HEIGHT >= GROUND_LEVEL) {
            this.y = GROUND_LEVEL - PLAYER_HEIGHT;
            this.onGround = true;
        }
        // Platform check
        platforms.forEach(platform => {
            // Ground check
            if (this.y + PLAYER_HEIGHT > platform.y && this.y + PLAYER_HEIGHT <= platform.y + platform.height && this.x + PLAYER_WIDTH >= platform.x && this.x <= platform.x + platform.width) {
                this.y = platform.y - PLAYER_HEIGHT;
                this.onGround = true;
                if (this.vecY > 0) {
                    this.vecY = 0;
                }
            }
            // Top check
            if (this.y >= platform.y && this.y <= platform.y + platform.height && this.x + PLAYER_WIDTH >= platform.x && this.x <= platform.x + platform.width) {
                this.topCheck = true;
            }

            // Left check
            if (this.y + PLAYER_HEIGHT > platform.y && this.y <= platform.y + platform.height && this.x <= platform.x + platform.width && this.x >= platform.x) {
                this.leftCheck = true;
            }

            // Right check
            if (this.y + PLAYER_HEIGHT > platform.y && this.y <= platform.y + platform.height && this.x + PLAYER_WIDTH >= platform.x && this.x + PLAYER_WIDTH + 10 <= platform.x + platform.width) {
                this.rightCheck = true;
            }
        });
    }
}

class Pellet{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = 10;
        this.height = 10;
    }
    display(){
        fill(151, 87, 43);
        rect(this.x, this.y, this.width, this.height);
    }
}

class Enemy {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.damage;
        this.hp;
        this.width;
        this.height;
    }
}

class Croc extends Enemy {
    constructor() {
        super();
        this.x = width;
        this.y = GROUND_LEVEL - 40;
        this.damage = 1;
        this.hp = 1;
        this.width = 100;
        this.height = 50;
    }
    display() {
        image(imgCrocClosed, this.x - viewportX, this.y, this.width, this.height);
        noFill();
        rect(this.x - viewportX, this.y + 20, this.width, this.height);
    }
    move() {
        this.x -= 5;
    }
}

class Turtle extends Enemy{
    constructor(){
        super();
        this.x = width;
        this.y = GROUND_LEVEL - 80;
        this.damage = 0.5;
        this.hp = 1;
        this.width = 80;
        this.height = 80;
    }
    display(){
        image(imgTurtleClosed, this.x - viewportX, this.y+10, this.width, this.height);
        noFill();
        rect(this.x - viewportX, this.y+10, this.width, this.height);
    }
}

class Boss extends Enemy{

}

class Hawk extends Boss{

}

class Bobcat extends Boss{

}
