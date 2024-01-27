let playerX, playerY;
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
    playerY = height / 2;
    vecY = 0;
}

function draw() {
    background(220);

    if (keyIsDown(LEFT_ARROW) || keyIsDown(LEFT_KEY)) {
        playerX -= 5;
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(RIGHT_KEY)) {
        playerX += 5;
    }
    if (keyIsDown(UP_ARROW) || keyIsDown(UP_KEY)) {

        // Ensure the player is on the ground (no double jumping)
        if (playerY >= GROUND_LEVEL - PLAYER_HEIGHT / 2) {   
            vecY = -10;
        }
    }

    // Gravity
    if (vecY > 0 && playerY >= GROUND_LEVEL - PLAYER_HEIGHT / 2) {
        vecY = 0;
        playerY = GROUND_LEVEL - PLAYER_HEIGHT / 2;
    } else if (playerY < GROUND_LEVEL - PLAYER_HEIGHT / 2) {
        vecY += 0.5;
    }

    // Player
    playerY += vecY;
    ellipse(playerX, playerY, PLAYER_WIDTH, PLAYER_HEIGHT);

    // Ground
    rect(0, GROUND_LEVEL, width, height - GROUND_LEVEL);
}