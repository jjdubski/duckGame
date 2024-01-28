class Pellet{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = 10;
        this.height = 10;
    }
    display(){
        fill(151, 87, 43);
        rect(this.x, this.y, this.width, this.height);
    }
}