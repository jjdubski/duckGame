class Platform {
    constructor(x, y) {
        this.width = random(50, 100);
        this.height = 20;
        this.x = x;
        this.y = y;
    }
    display() {
        fill(151, 87, 43);
        rect(this.x - viewportX, this.y, this.width, this.height);
    }
}