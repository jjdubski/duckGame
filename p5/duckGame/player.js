
class Player {
    constructor() {
        this.x = width / 2;
        this.y = (height / 2) + 30;

        this.velY = 0;
        this.velX = 0;

        this.onGround = false;
        this.topCheck = false;
        this.leftCheck = false;
        this.rightCheck = false;

        this.invincibility = 0;
    }
    display() {
        // Invincibility frames
        if (this.invincibility > 0) {
            this.invincibility--;
            
        } 

        // Flash the player if they are invincible
        if (this.invincibility % 20 < 10) {
            fill(255, 255, 255);
        } else {
            fill(255, 0, 0);
        }
        rect(this.x - viewportX, this.y, PLAYER_WIDTH, PLAYER_HEIGHT);
    }
    move() {
        // Collision check
        this.collisionCheck();

        // Update viewport
        viewportX = max(0, this.x - width / 2);

        // Gravity
        if (this.velY > 0 && this.onGround) {
            this.velY = 0;
        } else if (!this.onGround) {
            this.velY += 0.5;

            // Check if player is hitting the top of the platform
            // if (this.topCheck) {
            //     this.velY = Math.abs(this.velY * 0.2);
            // }
        }

        if (!this.leftCheck && (keyIsDown(LEFT_ARROW) || keyIsDown(LEFT_KEY))) {
            this.velX = -5;
        } 
        else if (!this.rightCheck && (keyIsDown(RIGHT_ARROW) || keyIsDown(RIGHT_KEY))) {
            if (!this.rightCheck) {
                this.velX = 5;
            }
        } 
        else {
            if (this.velX > 0) {
                this.velX = this.rightCheck ? 0 : this.velX - 0.5;
            } else if (this.velX < 0) {
                this.velX = this.leftCheck ? 0 : this.velX + 0.5;
            }
        }
        if (keyIsDown(UP_ARROW) || keyIsDown(UP_KEY)) {
            // Ensure the player is on the ground (no double jumping)
            if (this.onGround) {
                this.velY = -10;
            }
        }

        // Apply velocity
        this.x += this.velX;
        this.y += this.velY;
    }
    takeDamage(damage) {
        this.invincibility = 40;
        player.hp -= damage;
        console.log("ow");
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
            if (this.velY > 0 && this.y + PLAYER_HEIGHT > platform.y && this.y + PLAYER_HEIGHT <= platform.y + platform.height && this.x + PLAYER_WIDTH >= platform.x && this.x <= platform.x + platform.width) {
                this.y = platform.y - PLAYER_HEIGHT;
                this.onGround = true;
                if (this.velY > 0) {
                    this.velY = 0;
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

        // Enemy check
        if (this.invincibility <= 0) {
            let damageTaken = false;
            enemyList.forEach(enemy => {
                if (damageTaken) {
                    return;
                }

                // Check if the player is landing on the enemy. Knock the player up and deal damage.
                if (this.velY > 0 && this.y + PLAYER_HEIGHT > enemy.y && this.y + PLAYER_HEIGHT <= enemy.y + enemy.height && this.x + PLAYER_WIDTH >= enemy.x && this.x <= enemy.x + enemy.width) {
                    this.takeDamage(enemy.damage);
                    // this.velY = -10;
                    damageTaken = true;
                    return;
                }
                // Top check
                if (this.y >= enemy.y && this.y <= enemy.y + enemy.height && this.x + PLAYER_WIDTH >= enemy.x && this.x <= enemy.x + enemy.width) {
                    this.takeDamage(enemy.damage);
                    damageTaken = true;
                    return;
                }

                // Check if the player is hitting the enemy from the left side. Knock the player back and deal damage.
                if (this.y + PLAYER_HEIGHT > enemy.y && this.y <= enemy.y + enemy.height && this.x <= enemy.x + enemy.width && this.x >= enemy.x) {
                    this.takeDamage(enemy.damage);
                    // this.velX = 10;
                    damageTaken = true;
                    return;
                }

                // Check if the player is hitting the enemy from the right side. Knock the player back and deal damage.
                if (this.y + PLAYER_HEIGHT > enemy.y && this.y <= enemy.y + enemy.height && this.x + PLAYER_WIDTH >= enemy.x && this.x + PLAYER_WIDTH <= enemy.x + enemy.width) {
                    this.takeDamage(enemy.damage);
                    // this.velX = -10;
                    damageTaken = true;
                    return;
                }
            });
        }
    }
}