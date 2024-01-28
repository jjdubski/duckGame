
class Enemy {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
        this.damage;
        this.hp;
        this.width;
        this.height;
        this.soundPlayed = false;
        this.type;
    }
}

class Croc extends Enemy {
    constructor(x) {
        super();
        this.x = x || width;
        this.y = GROUND_LEVEL - 50;
        this.damage = 1;
        this.hp = 1;
        this.width = 100;
        this.height = 50;
        this.type = "croc";
    }
    display() {
        if(this.x + this.width >= viewportX && this.x <= viewportX + width){
            if(millis()%1000 < 500){
                image(imgCrocClosed, this.x - viewportX, this.y, this.width, this.height);
            }else{  
                image(imgCrocOpen, this.x - viewportX, this.y, this.width, this.height);
            }
            // noFill();
            // rect(this.x - viewportX, this.y + 20, this.width, this.height);
            if(this.soundPlayed == false){
                crocSound.play();
                this.soundPlayed = true;
            }
            
        }
    }
}

class Turtle extends Enemy{
    constructor(x, y){
        super();
        this.x = x || width;
        this.y = y || GROUND_LEVEL - 30;
        this.damage = 0.5;
        this.hp = 1;
        this.width = 50;
        this.height = 30;
        this.type = "turtle";
    }
    display(){
        if(this.x + this.width >= viewportX && this.x <= viewportX + width){
            if(millis()%500 < 250){
                image(imgTurtleClosed, this.x - viewportX, this.y, this.width, this.height);
            }else{  
                image(imgTurtleOpen, this.x - viewportX, this.y, this.width, this.height);
            }
            // noFill();
            // rect(this.x - viewportX, this.y, this.width, this.height);
            if(this.soundPlayed == false){
                turtleSound.play();
                this.soundPlayed = true;
            }
        }
    }
}

class Boss extends Enemy{
    constructor(x,y){
        super();
        this.x = x;
        this.y = y;
        this.damage;
        this.hp;
        this.width;
        this.height;
    }
}

class Hawk extends Boss {
    constructor(x, y) {
        super();
        this.x = x || width / 2;
        this.y = y || 30;
        this.damage = 1.5;
        this.hp = 1;
        this.width = 100;
        this.height = 60;

        this.state = -1;
        this.stateCounter = 0;

        this.targetX = 0;
        this.targetY = 0;
        this.diveSpeedX = 0;
        this.diveSpeedY = 0;
    }
    move() {
        switch (this.state) {
        // State -1: Move from the right of the screen into the top right corner
        case -1:
            this.x -= 2;
            if (this.x - viewportX <= width - 100) {
                this.state = 0;
            }
            break;
        
        // State 0: Wait for 60 frames
        case 0:
            this.stateCounter++;
            if (this.stateCounter > 60) {
                this.state = 1;
                this.stateCounter = 0;

                this.determinePlayerTarget();
            }
            break;

        // State 1: Dive down to target position
        case 1:
            this.soundPlayed = false;
            if (this.x > this.targetX) {
                this.x += this.diveSpeedX;
            }
            if (this.y < this.targetY) {
                this.y += this.diveSpeedY;
            }
            if (this.x <= this.targetX && this.y >= this.targetY) {
                this.state = 2;

                // Determine target which is the top left corner
                this.targetX = viewportX;
                this.targetY = 120; 

                // Determine speed
                this.diveSpeedX = (this.targetX - this.x) / 90;
                this.diveSpeedY = (this.targetY - this.y) / 90;
            }
            break;

        // State 2: Fly up to target position
        case 2:
            if (Math.abs(this.x - this.targetX) > 20) {
                this.x += this.diveSpeedX;
            }
            if (this.y > this.targetY) {
                this.y += this.diveSpeedY;
            }
            if (Math.abs(this.x - this.targetX) < 20 && this.y <= this.targetY) {
                this.state = 3;
                this.stateCounter = 0;
            }
            break;

        // State 3: Wait for 60 frames
        case 3:
            this.stateCounter++;
            if (this.stateCounter > 60) {
                this.state = 4;
                this.stateCounter = 0;

                this.determinePlayerTarget();
            }
            break;

        // State 4: Dive down to target position
        case 4:
            this.soundPlayed = false;
            if (this.x < this.targetX) {
                if(this.x <= viewportX + width){
                    this.x += this.diveSpeedX;
                }
            }
            if (this.y < this.targetY) {
                this.y += this.diveSpeedY;
            }
            if (this.x >= this.targetX && this.y >= this.targetY) {
                this.state = 5;

                // Determine target which is the top right corner
                this.targetX = viewportX + width - 100;
                this.targetY = 120; 

                // Determine speed
                this.diveSpeedX = (this.targetX - this.x) / 90;
                this.diveSpeedY = (this.targetY - this.y) / 90;
            }
            break;

        // State 5: Fly up to target position
        case 5:
            if (Math.abs(this.x - this.targetX) > 20) {
                this.x += this.diveSpeedX;
            }
            if (this.y > this.targetY) {
                this.y += this.diveSpeedY;
            }
            if (Math.abs(this.x - this.targetX) < 20 && this.y <= this.targetY) {
                this.state = 0;
                this.stateCounter = 0;
            }
            break;
        }

    }
    display(){
        if(this.x + this.width >= viewportX && this.x <= viewportX + width){
            image(imgHawk, this.x - viewportX, this.y, this.width, this.height);
            // noFill();
            // rect(this.x - viewportX, this.y, this.width, this.height);
            if(this.soundPlayed == false){
                hawkSound.play();
                this.soundPlayed = true;
            }
        }
    }

    determinePlayerTarget() {
        // Determine target position, which overshoots the player's position
        let angleToPlayer = Math.atan2(player.y - this.y, player.x - this.x);

        // Clamp coords to the screen
        if (player.x + 200 * Math.cos(angleToPlayer) < viewportX) {
            let diveDist = (viewportX - player.x) / Math.cos(angleToPlayer);
            this.targetX = player.x + diveDist * Math.cos(angleToPlayer);
            this.targetY = player.y + diveDist * Math.sin(angleToPlayer);
        } else if (player.x + 200 * Math.cos(angleToPlayer) > viewportX + width - this.width) {
            let diveDist = (viewportX + width - this.width - player.x) / Math.cos(angleToPlayer);
            this.targetX = player.x + diveDist * Math.cos(angleToPlayer);
            this.targetY = player.y + diveDist * Math.sin(angleToPlayer);
        } else {
            this.targetX = player.x + 200 * Math.cos(angleToPlayer);
            this.targetY = player.y + 200 * Math.sin(angleToPlayer);
        }

        // Determine speed
        this.diveSpeedX = (this.targetX - this.x) / 40;
        this.diveSpeedY = (this.targetY - this.y) / 40;
    }
}

class Bobcat extends Boss{

}
