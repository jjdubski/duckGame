var MENU_WIDTH;
var MENU_HEIGHT;

var BUTTON_WIDTH;
var BUTTON_HEIGHT;

var PLAY_BUTTON_Y;
var HELP_BUTTON_Y;
var QUIT_BUTTON_Y;

var MENU_STATE = 'main';

var cooldown = 0;

function setupMenu() {
    MENU_WIDTH = width * 0.6;
    MENU_HEIGHT = height * 0.5;

    BUTTON_WIDTH = MENU_WIDTH * 0.5;
    BUTTON_HEIGHT = MENU_HEIGHT * 0.1;

    PLAY_BUTTON_Y = MENU_HEIGHT * 0.3;
    HELP_BUTTON_Y = MENU_HEIGHT * 0.5;
    QUIT_BUTTON_Y = MENU_HEIGHT * 0.7;
}

function displayMenu() {
    if (MENU_STATE == 'main') {
        displayMainMenu();
    } else if (MENU_STATE == 'help') {
        displayHelpMenu();
    } else if (MENU_STATE == 'play') {

    }

    // Cooldown for menu buttons
    if (cooldown > 0) {
        cooldown--;
    }
}

function displayMainMenu() {
    // Display the menu
    fill(150, 150, 255);
    rect(width / 2 - MENU_WIDTH / 2, height / 2 - MENU_HEIGHT / 2, MENU_WIDTH, MENU_HEIGHT);

    // Display the title
    fill(0);
    textSize(50);
    textAlign(CENTER);
    text('Duck Game', width / 2, height / 2 - MENU_HEIGHT / 2 + 50);

    // Display the buttons
    displayButton(width / 2 - BUTTON_WIDTH / 2, height / 2 - MENU_HEIGHT / 2 + PLAY_BUTTON_Y, BUTTON_WIDTH, BUTTON_HEIGHT, 'Play');
    displayButton(width / 2 - BUTTON_WIDTH / 2, height / 2 - MENU_HEIGHT / 2 + HELP_BUTTON_Y, BUTTON_WIDTH, BUTTON_HEIGHT, 'Help');
    displayButton(width / 2 - BUTTON_WIDTH / 2, height / 2 - MENU_HEIGHT / 2 + QUIT_BUTTON_Y, BUTTON_WIDTH, BUTTON_HEIGHT, 'Quit');
}

function displayHelpMenu() {
    // Display the menu
    fill(150, 150, 255);
    rect(width / 2 - MENU_WIDTH / 2, height / 2 - MENU_HEIGHT / 2, MENU_WIDTH, MENU_HEIGHT);

    // Display the title
    fill(0);
    textSize(50);
    textAlign(CENTER);
    text('Help', width / 2, height / 2 - MENU_HEIGHT / 2 + 50);

    // Display the text
    fill(0);
    textSize(20);
    textAlign(LEFT);
    text('Use the arrow/WASD keys to move and jump. Press Space to attack.', width / 2 - MENU_WIDTH / 2 + 20, height / 2 - MENU_HEIGHT / 2 + 100, MENU_WIDTH - 40);

    // Display the buttons
    displayButton(width / 2 - BUTTON_WIDTH / 2, height / 2 - MENU_HEIGHT / 2 + QUIT_BUTTON_Y, BUTTON_WIDTH, BUTTON_HEIGHT, 'Back');
}

function displayButton(x, y, w, h, txt) {
    // Draw the button
    fill(255);
    rect(x, y, w, h);

    // Draw the text
    fill(0);
    textSize(30);
    textAlign(CENTER);
    text(txt, x + w / 2, y + h / 2 + 10);

    // Check if the button is clicked
    if (mouseIsPressed && cooldown == 0) {
        if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
            cooldown = 30;

            if (txt == 'Play') {
                MENU_STATE = 'play';
            } else if (txt == 'Help') {
                MENU_STATE = 'help';
            } else if (txt == 'Quit') {
                MENU_STATE = 'quit';
            } else if (txt == 'Back') {
                MENU_STATE = 'main';
            }
        }
    }
}