class Bullet{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.velX = 8;
        this.width = 40;
        this.height = 20;
        this.bulletOrientation = player.orientation;
    }
    display(){
        if (this.bulletOrientation == 1) {
            image(imgBullet, this.x, this.y, this.width, this.height);
        } else {
            push();
            scale(-1,1);
            image(imgBullet, -this.x, this.y, this.width, this.height);
            pop();
        }
        //noFill();
        //rect(this.x,this.y,this.width,this.height);
    }
    move(){
        if(this.bulletOrientation == -1){
            this.x -= this.velX;
        }else if(this.bulletOrientation == 1){
            this.x += this.velX;
        }
    }
}