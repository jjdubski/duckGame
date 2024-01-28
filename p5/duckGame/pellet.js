class Pellet {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 20;
    }
    display(){
        fill(255, 150, 0);
        ellipse(this.x - viewportX, this.y, this.width, this.height);

        // // Collision check
        // if (this.x + this.width > player.x && this.x < player.x + PLAYER_WIDTH) {
        //     if (this.y + this.height > player.y && this.y < player.y + PLAYER_HEIGHT) {
        //         this.heal();
        //     }
        // }
    }
    heal(){
        player.hp += 0.25;
        console.log(player.hp);
        // delete this;
    }
}