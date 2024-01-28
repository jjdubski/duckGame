let player, platform;
let croc, turtle;
let viewportX = 0;
let platforms = [];
let enemyList = [];
let pellets = [];
let bossFight = false;

let imgCrocClosed, imgCrocOpen;
let imgTurtleClosed, imgTurtleOpen;
let imgIsland, imgTrees;
let imgDuck, imgDuckWalk;
let imgWater;
let turtleSound, crocSound, duckSound;

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

    imgTurtleClosed = loadImage('assets/turtle.png');
    imgTurtleOpen = loadImage('assets/turtle_open.png');

    imgIsland = loadImage('assets/island.png');
    imgTrees = loadImage('assets/trees.png');
    imgPlatform = loadImage('assets/platform.png');

    imgDuck = loadImage('assets/duck.png');
    imgDuckWalk = loadImage('assets/duck_walk.png');

    imgWater = loadImage('assets/water.png');
    imgPellet = loadImage('assets/pellet.png');
    imgHeart = loadImage('assets/heart.png');

    turtleSound = loadSound('assets/sounds/turtle.mp3');
    crocSound = loadSound('assets/sounds/croc.mp3');
    duckSound = loadSound('assets/sounds/quack.mp3');
    hawkSound = loadSound('assets/sounds/hawk.mp3');
    splashSound = loadSound('assets/sounds/splash.mp3');
}

function setup() {
    createCanvas(980, 700);

    player = new Player();
    levelGeneration(100);
}

function draw() {
    if(player.hp <= 0){
        noLoop();
    }else{
        frameRate(60);
        background(imgIsland);  

        player.display();
        player.move();
    }
    if(player.x > 1000){
        bossFight = true;
    }
    platforms.forEach(platform => {
        // Only display platforms that are on the screen
        if (platform.x + platform.width >= viewportX && platform.x <= viewportX + width) {
            platform.display();
        }
    });

    enemyList.forEach(enemy => {
        enemy.display();
    });

    pellets.forEach(pellet => {
        pellet.display();
    });
    //croc.display();
    // turtle.display();
    // Ground
    image(imgWater, 0, GROUND_LEVEL-10, width, 200);
}

function levelGeneration(maxSteps) {
    let nextX = 0;
    let nextY = GROUND_LEVEL - 100;
    let jumpDistance = 150;

    // Spawn first platform
    let newPlatform = new Platform(nextX, nextY);
    platforms.push(newPlatform);

    for (let i = 0; i < maxSteps; i++) {
        nextX += newPlatform.width;

        // Put the next step within a jumping distance from the previous step
        let angle = random(-PI / 3, PI / 3);
        nextX += jumpDistance * cos(angle);
        nextY = min(max(PLAYER_HEIGHT + 100, nextY + jumpDistance * sin(angle)), GROUND_LEVEL - 200);

        // Spawn a new platform
        newPlatform = new Platform(nextX, nextY);
        platforms.push(newPlatform);

        // If the platform is too tall, have a chance to spawn a platform along it
        if (nextY < GROUND_LEVEL - 300) {
            // High chance to spawn pellets for an incentive
            if (random(1) < 0.8) {
                for (let j = 0; j < newPlatform.width / 20 - 1; j++) {
                    let newPellet = new Pellet(nextX + j * 20 + 10, nextY - 15);
                    pellets.push(newPellet);
                }

                console.log('pellet spawned');
            }

            if (random(1) > 0.2){
                nextY = random(GROUND_LEVEL - 150, GROUND_LEVEL - 100);
                platforms.push(new Platform(nextX, nextY));
            }

            // Or a crocodile
            if (random(1) > 0.3) {
                let newCroc = new Croc(nextX + random(100, 250), GROUND_LEVEL - 50);
                enemyList.push(newCroc);
                console.log('croc spawned');
            }
        }

        // Else if the platform is too low, have a chance to spawn a turtle
        else if (nextY > GROUND_LEVEL - 250) {
            if (random(1) > 0.1) {
                distanceBuffer = random(50,100);
                if (distanceBuffer+nextX <= newPlatform.width) {
                    let newTurtle = new Turtle(nextX + random(50, 100), nextY - 30);
                    enemyList.push(newTurtle);
                }

                console.log('turtle spawned');
            }
        }
    }
}   