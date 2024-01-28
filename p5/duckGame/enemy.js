
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
            if(frameCount % 30 == 0 || frameCount%30 == 1 || frameCount%30 == 2 || frameCount%30 == 3 || frameCount%30 == 4 || frameCount%30 == 5){
                image(imgCrocClosed, this.x - viewportX, this.y, this.width, this.height);
            }else{  
                image(imgCrocOpen, this.x - viewportX, this.y, this.width, this.height);
            }
            noFill();
            rect(this.x - viewportX, this.y + 20, this.width, this.height);
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
        this.y = y || GROUND_LEVEL - 50;
        this.damage = 0.5;
        this.hp = 1;
        this.width = 50;
        this.height = 50;
    }
    display(){
        if(this.x + this.width >= viewportX && this.x <= viewportX + width){
            if(frameCount % 30 == 0 || frameCount%30 == 1 || frameCount%30 == 2 || frameCount%30 == 3 || frameCount%30 == 4 || frameCount%30 == 5){
                image(imgTurtleClosed, this.x - viewportX, this.y, this.width, this.height);
            }else{  
                image(imgTurtleOpen, this.x - viewportX, this.y, this.width, this.height);
            }
            noFill();
            rect(this.x - viewportX, this.y, this.width, this.height);
            if(this.soundPlayed == false){
                turtleSound.play();
                this.soundPlayed = true;
            }
        }
    }
}

class Boss extends Enemy{

}

class Hawk extends Boss{

}

class Bobcat extends Boss{

}
