let playerX, playerY = 0;
let vecY = 0;
let playerOnGround = false;
let viewX = 0;

const RIGHT_KEY = 68; // D
const LEFT_KEY = 65; // A
const UP_KEY = 87; // W
const DOWN_KEY = 83; // S

const GROUND_LEVEL = 600;
const PLAYER_HEIGHT = 50;
const PLAYER_WIDTH = 50;

function setup() {
    createCanvas(400, 800);
    playerX = width / 2;
    playerY = (height / 2) + 30;
}

function draw() {
    background(173, 216, 230);

    // Update viewport
    viewX = max(0, playerX - width / 2);

    if (keyIsDown(LEFT_ARROW) || keyIsDown(LEFT_KEY)) {
        playerX -= 5;
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(RIGHT_KEY)) {
        playerX += 5;
    }
    if (keyIsDown(UP_ARROW) || keyIsDown(UP_KEY)) {
        // Ensure the player is on the ground (no double jumping)
        if (playerOnGround) {
            vecY = -10;
            playerOnGround = false;
        }
    }

    // Gravity
    if (vecY > 0 && playerY >= GROUND_LEVEL - PLAYER_HEIGHT) {
        vecY = 0;
        playerY = GROUND_LEVEL - PLAYER_HEIGHT;
        playerOnGround = true;
    } else if (playerY < GROUND_LEVEL - PLAYER_HEIGHT) {
        vecY += 0.5;
    }

    // Player
    playerY += vecY;
    rect(playerX - viewX, playerY, PLAYER_WIDTH, PLAYER_HEIGHT);

    // Test platforms
    rect(100 - viewX, GROUND_LEVEL - 100, 100, 20);
    rect(300 - viewX, GROUND_LEVEL - 200, 100, 20);
    rect(500 - viewX, GROUND_LEVEL - 100, 100, 20);

    // Ground
    rect(0, GROUND_LEVEL, width, height - GROUND_LEVEL);
}