
class Enemy {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.damage;
        this.hp;
        this.width;
        this.height;
    }
}

class Croc extends Enemy {
    constructor() {
        super();
        this.x = width;
        this.y = GROUND_LEVEL - 40;
        this.damage = 1;
        this.hp = 1;
        this.width = 100;
        this.height = 50;
    }
    display() {
        image(imgCrocClosed, this.x - viewportX, this.y, this.width, this.height);
        noFill();
        rect(this.x - viewportX, this.y + 20, this.width, this.height);
    }
    attack(){
        player.hp -= this.damage;
    }
}

class Turtle extends Enemy{
    constructor(){
        super();
        this.x = width;
        this.y = GROUND_LEVEL - 80;
        this.damage = 0.5;
        this.hp = 1;
        this.width = 80;
        this.height = 80;
    }
    display(){
        image(imgTurtleClosed, this.x - viewportX, this.y, this.width, this.height);
        noFill();
        rect(this.x - viewportX, this.y, this.width-10, this.height);
    }
    attack(){
        player.hp -= this.damage;
    }
}

class Boss extends Enemy{

}

class Hawk extends Boss{

}

class Bobcat extends Boss{

}
