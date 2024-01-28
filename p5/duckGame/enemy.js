
class Enemy {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
        this.damage;
        this.hp;
        this.width;
        this.height;
        this.soundPlayed = false;
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
        this.hpBar;
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
        console.log(this.state);
        // State -1: Move from the right of the screen into the top right corner
        if (this.state == -1) {
            this.x -= 2;
            if (this.x - viewportX <= width - 100) {
                this.state = 0;
            }
        }
        
        // State 0: Wait for 60 frames
        if (this.state == 0) {
            this.stateCounter++;
            if (this.stateCounter > 60) {
                this.state = 1;
                this.stateCounter = 0;

                this.determinePlayerTarget();
            }
        } 

        // State 1: Dive down to target position
        if (this.state == 1) {
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
                this.targetY = 100; 

                // Determine speed
                this.diveSpeedX = (this.targetX - this.x) / 90;
                this.diveSpeedY = (this.targetY - this.y) / 90;
            }
        }

        // State 2: Fly up to target position
        if (this.state == 2) {
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
        }

        // State 3: Wait for 60 frames
        if (this.state == 3) {
            this.stateCounter++;
            if (this.stateCounter > 60) {
                this.state = 4;
                this.stateCounter = 0;

                this.determinePlayerTarget();
            }
        }  

        // State 4: Dive down to target position
        if (this.state == 4) {
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
                this.targetY = 100; 

                // Determine speed
                this.diveSpeedX = (this.targetX - this.x) / 90;
                this.diveSpeedY = (this.targetY - this.y) / 90;
            }
        }


        // State 5: Fly up to target position
        if (this.state == 5) {
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
        }

    }
    display(){
        if(this.x + this.width >= viewportX && this.x <= viewportX + width){
            fill(200, 10, 10);
            this.hpBar = rect(viewportX - (width/2)+10, 50, width-20, 10, 10);
            fill(139, 0, 0);
            textSize(28);
            text("Hawk", viewportX, 20, 50, 30);
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
        this.targetX = player.x + 200 * Math.cos(angleToPlayer);
        this.targetY = player.y + 200 * Math.sin(angleToPlayer);

        // Determine speed
        this.diveSpeedX = (this.targetX - this.x) / 40;
        this.diveSpeedY = (this.targetY - this.y) / 40;

        console.log(this.targetX, this.targetY);
        console.log(this.diveSpeedX, this.diveSpeedY);
    }
}

class Bobcat extends Boss{

}
