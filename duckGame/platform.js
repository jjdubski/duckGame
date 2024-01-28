class Platform {
    constructor(x, y, width) {
        this.width = width || random(100, 200);
        this.height = 20;
        this.x = x;
        this.y = y;
    }
    display() {
        image(imgPlatform, this.x - viewportX, this.y, this.width, this.height);
        // noFill();
        // rect(this.x - viewportX, this.y, this.width, this.height);
    }
}