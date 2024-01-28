
class Enemy {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
        this.damage;
        this.hp;
        this.width;
        this.height;
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
        image(imgCrocClosed, this.x - viewportX, this.y, this.width, this.height);
        noFill();
        rect(this.x - viewportX, this.y + 20, this.width, this.height);
    }
    attack(){
        player.hp -= this.damage;
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
        image(imgTurtleClosed, this.x - viewportX, this.y+30, this.width, this.height);
        noFill();
        rect(this.x - viewportX, this.y+30, this.width, this.height);
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
