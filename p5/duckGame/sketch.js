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