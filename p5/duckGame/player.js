
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
            // if (this.topCheck) {
            //     this.vecY = Math.abs(this.vecY * 0.2);
            // }
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
                this.vecY = -12;
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
            if (this.vecY > 0 && this.y + PLAYER_HEIGHT > platform.y && this.y + PLAYER_HEIGHT <= platform.y + platform.height && this.x + PLAYER_WIDTH >= platform.x && this.x <= platform.x + platform.width) {
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