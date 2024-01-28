let player, platform;
let croc, turtle;
let viewportX = 0;
let platforms = [];
let enemyList = [];
let pellets = [];
let bossFight = false;
let arena = 1;
let screen = 'game';

let bullet = null;

let imgCrocClosed, imgCrocOpen;
let imgTurtleClosed, imgTurtleOpen;
let imgIsland, imgTrees;
let imgDuck, imgDuckWalk;
let imgHawk, imgBobcat;
let imgWater, imgPellet, imgHeart, imgBullet;
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

    imgHawk = loadImage('assets/hawk.png');
    //imgBobcat = loadImage('assets/bobcat.png');

    imgWater = loadImage('assets/water.png');
    imgPellet = loadImage('assets/pellet.png');
    imgHeart = loadImage('assets/heart.png');
    imgBullet = loadImage('assets/waterDrop.png');

    turtleSound = loadSound('assets/sounds/turtle.mp3');
    crocSound = loadSound('assets/sounds/croc.mp3');
    duckSound = loadSound('assets/sounds/quack.mp3');
    hawkSound = loadSound('assets/sounds/hawk.mp3');
    splashSound = loadSound('assets/sounds/splash.mp3');
}

function keyPressed() {
    if (keyCode == 27 || keyCode == 13 || keyCode == ESCAPE) {
        player.attack();
    }
}

function setup() {
    createCanvas(980, 700);
    setupMenu();
    player = new Player();
    hawk = new Hawk(width,100);
    levelGeneration(100);
}

function draw() {
    switch(MENU_STATE){
        case 'main':
            displayMainMenu();
            break;

        case 'help':
            displayHelpMenu();
            break;

        case 'pause':
            displayPauseMenu();
            break;

        case 'play':
            if(player.hp <= 0){
                MENU_STATE = 'gameOver';
            }else{
                frameRate(60);
                if(arena == 1){
                    background(imgIsland);  
                }else if(arena == 2){
                    background(imgTrees);
                }
                player.display();
                player.move();
            }
            if(!bossFight && player.x > 2000){
                arenaGeneration();
                bossFight = true;
                hawk.x = width + 100 + viewportX;
        
                // Clear enemies
                enemyList = [];
                enemyList.push(hawk);
        
                // Clear pellets
                pellets = [];

                // Clear platforms
                platforms = [];
            }
            if (bossFight==true){
                if(arena == 1){
                }
            }
            platforms.forEach(platform => {
                // Only display platforms that are on the screen
                if (platform.x + platform.width >= viewportX && platform.x <= viewportX + width) {
                    platform.display();
                }
            });
        
            enemyList.forEach(enemy => {
                enemy.display();
                if (enemy.move) {
                    enemy.move();
                }
            });
        
            pellets.forEach(pellet => {
                pellet.display();
            });
            //croc.display();
            // turtle.display();
            // Ground
            image(imgWater, 0, GROUND_LEVEL-10, width, 200);

            // Pause button
            if (keyIsDown(27) || keyIsDown(80)) {
                MENU_STATE = 'pause';
            }
            break;
        case 'gameOver':
            displayGameOverMenu();
            break;

        case 'win':
            displayWinMenu();
            break;

        default:
            break;
    }
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

        let pelletSpawned = false;

        // If the platform is too tall, have a chance to spawn a platform along it
        if (nextY < GROUND_LEVEL - 300) {
            // High chance to spawn pellets for an incentive
            if (random(1) < 0.6 ) {
                for (let j = 0; j < newPlatform.width / 25 - 1; j++) {
                    let newPellet = new Pellet(nextX + j * 25 + 10, nextY - 15);
                    pellets.push(newPellet);
                }
                pelletSpawned = true;
                console.log('pellet spawned');
            }

            if (random(1) > 0.2){
                nextY = random(GROUND_LEVEL - 150, GROUND_LEVEL - 100);
                platforms.push(new Platform(nextX, nextY));
            }
        }

        // High chance of crocodile spawning because the player needs to be punished
        if (random(1) < 0.8) {
            let newCroc = new Croc(nextX + random(100, 250), GROUND_LEVEL - 50);
            enemyList.push(newCroc);
            console.log('croc spawned');
        }

        // Have a chance to spawn a turtle. Skip if the platform is too short
        if (!pelletSpawned && newPlatform.width > 150) {
            if (random(1) < 0.5) {
                let newTurtle = new Turtle(nextX + newPlatform.width/2 + random(-10, 10), nextY - 30);
                enemyList.push(newTurtle);

                console.log('turtle spawned');
            }
        }
    }
}   

function arenaGeneration() {
    // One low platform in the middle in case the player falls
    platforms.push(new Platform(width/2 - 100 + viewportX, GROUND_LEVEL - 100, 200));

    // Two mid platforms on both sides
    platforms.push(new Platform(width/2 - 250 + viewportX, GROUND_LEVEL - 250));
    platforms.push(new Platform(width/2 + 150 + viewportX, GROUND_LEVEL - 250));

    // One high platform in the middle
    platforms.push(new Platform(width/2 - 100 + viewportX, 200, 200));

    // Two low platforms on both sides for pellets
    let pelletPlatform = new Platform(width/2 - 450 + viewportX, GROUND_LEVEL - 100);
    platforms.push(pelletPlatform);
    for (let i = 0; i < pelletPlatform.width / 25 - 1; i++) {
        let newPellet = new Pellet(pelletPlatform.x + i * 25 + 10, pelletPlatform.y - 15);
        pellets.push(newPellet);
    }

    pelletPlatform = new Platform(width/2 + 350 + viewportX, GROUND_LEVEL - 100);
    platforms.push(pelletPlatform);

    for (let i = 0; i < pelletPlatform.width / 25 - 1; i++) {
        let newPellet = new Pellet(pelletPlatform.x + i * 25 + 10, pelletPlatform.y - 15);
        pellets.push(newPellet);
    }
}     

