class Bullet{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.velX = 8;
        this.width = 40;
        this.height = 20;
        this.bulletOrientation = player.orientation;
        this.disappeared = false;
    }
    display(){
        if (this.disappeared) {
            return;
        }

        if (this.bulletOrientation == 1) {
            image(imgBullet, this.x - viewportX, this.y, this.width, this.height);
        } else {
            push();
            translate(this.x - viewportX, this.y);
            scale(-1,1);
            image(imgBullet, -this.width, 0, this.width, this.height);
            pop();
        }
        //noFill();
        //rect(this.x,this.y,this.width,this.height);
    }
    move(){
        if (this.disappeared) {
            return;
        }

        if(this.bulletOrientation == -1){
            this.x -= this.velX;
        }else if(this.bulletOrientation == 1){
            this.x += this.velX;
        }

        // Enemy collision check
        for (let i = 0; i < enemyList.length; i++) {
            if (this.x + this.width > enemyList[i].x && this.x < enemyList[i].x + enemyList[i].width && this.y + this.height > enemyList[i].y && this.y < enemyList[i].y + enemyList[i].height) {
                enemyList[i].hp -= 1;
            
                this.disappeared = true;
                player.bullet = null;
                if(enemyList[i].type == "turtle"){
                    player.score += 50;
                }else if(enemyList[i].type == "croc"){
                    player.score += 100;
                }
            }
        }
    }
}