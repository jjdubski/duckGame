
class Player {
    constructor() {
        this.x = PLAYER_WIDTH;
        this.y = (height / 2) + 30;
        this.hp = BASE_HP;

        this.velY = 0;
        this.velX = 0;

        this.onGround = false;
        this.topCheck = false;
        this.leftCheck = false;
        this.rightCheck = false;

        this.splashPlayed = false;

        this.invincibility = 0;
        this.orientation = 1;
        this.attackDelay = 0;
    }
    attack(){
        if(keyIsDown(32) && this.attackDelay == 0){
            console.log("attack");
            this.attackDelay = 100; 
        }else if(this.attackDelay>0){
            this.attackDelay--;
        }
    }
    display() {
        // Invincibility frames
        if (this.invincibility > 0) {
            this.invincibility--;
        } 
        // Flash the player if they are invincible
        if (this.invincibility % 20 < 10) {
            noTint();
        } else {
            tint(255, 255, 255, 100);
        }
        noFill();

        // Draw the player
        if (this.orientation == 1) {
            image(imgDuck, this.x - viewportX, this.y, PLAYER_WIDTH, PLAYER_HEIGHT);
        } else {
            push();

            // Messy but that's just how this library works
            translate(this.x - viewportX, this.y);
            scale(-1, 1);
            image(imgDuck, -PLAYER_WIDTH, 0, PLAYER_WIDTH, PLAYER_HEIGHT);
            pop();
        }
        rect(this.x - viewportX, this.y, PLAYER_WIDTH, PLAYER_HEIGHT);

        this.attack();

        // Draw the player's health bar
        for (let i = 0; i < Math.ceil(this.hp); i++) {
            if (i + 1 > this.hp) {
                let halfHeart = imgHeart.get(0, 0, imgHeart.width / 2, imgHeart.height);
                image(halfHeart, 10 + i * 30, 10, 15, 30);
            } else {
                image(imgHeart, 10 + i * 30, 10, 30, 30);
            }
        }

        // Reset the tint
        noTint();
    }
    move() {
        if (this.x < viewportX) {
            this.x = viewportX;
        }
        // Collision check
        this.collisionCheck();

        // Update viewport
        if(bossFight == false){
            viewportX = max(0, this.x - width / 2);
        }
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
        if(!this.leftCheck && !this.rightCheck && (keyIsDown(LEFT_ARROW) || keyIsDown(LEFT_KEY)) && (keyIsDown(RIGHT_ARROW) || keyIsDown(RIGHT_KEY))){
            this.velX = 0;
        }
        else if (!this.leftCheck && (keyIsDown(LEFT_ARROW) || keyIsDown(LEFT_KEY))) {
            this.velX = -5.5;
            this.orientation = -1;
        } 
        else if (!this.rightCheck && (keyIsDown(RIGHT_ARROW) || keyIsDown(RIGHT_KEY))) {
            this.velX = 5.5;
            this.orientation = 1;
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
                this.velY = -12;
                this.splashPlayed = false;
            }
        }

        // Apply velocity
        this.x += this.velX;
        this.y += this.velY;
    }
    takeDamage(damage) {
        this.invincibility = 100;
        this.hp -= damage;
        duckSound.play();
        console.log(player.hp);
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
            if(this.splashPlayed == false){
                splashSound.play();
                this.splashPlayed = true;
            }
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
            // // Top check
            // if (this.y >= platform.y && this.y <= platform.y + platform.height && this.x + PLAYER_WIDTH >= platform.x && this.x <= platform.x + platform.width) {
            //     this.topCheck = true;
            // }

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
                }else if (this.y >= enemy.y && this.y <= enemy.y + enemy.height && this.x + PLAYER_WIDTH >= enemy.x && this.x <= enemy.x + enemy.width) {
                    this.takeDamage(enemy.damage);
                    damageTaken = true;
                    return;
                }

                // Check if the player is hitting the enemy from the left side. Knock the player back and deal damage.
                else if (this.y + PLAYER_HEIGHT > enemy.y && this.y <= enemy.y + enemy.height && this.x <= enemy.x + enemy.width && this.x >= enemy.x + enemy.width+10) {
                    this.takeDamage(enemy.damage);
                    // this.velX = 10;
                    damageTaken = true;
                    return;
                }

                // Check if the player is hitting the enemy from the right side. Knock the player back and deal damage.
                else if (this.y + PLAYER_HEIGHT > enemy.y && this.y <= enemy.y + enemy.height && this.x + PLAYER_WIDTH >= enemy.x && this.x + PLAYER_WIDTH <= enemy.x + enemy.width) {
                    this.takeDamage(enemy.damage);
                    // this.velX = -10;
                    damageTaken = true;
                    return;
                }
            });
        }

        // Pellet check
        for (let i = 0; i < pellets.length; i++) {
            if (pellets[i].x + pellets[i].width > this.x && pellets[i].x < this.x + PLAYER_WIDTH) {
                if (pellets[i].y + pellets[i].height > this.y && pellets[i].y < this.y + PLAYER_HEIGHT) {
                    pellets[i].heal();
                    pellets.splice(i, 1);
                }
            }
        }
    }
}