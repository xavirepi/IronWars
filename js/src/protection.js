class Protection {
    constructor(ctx, x, y) {
        this.ctx = ctx;

        this.x = x;
        this.y = y;

        this.vy = 6;

        this.img = new Image();
        this.img.src = './images/protectionSpriteLight.png';
        this.img.isReady = false;
        this.img.onload = () => {
            this.img.isReady = true;
            this.width = 60;
            this.height = 60;
        }

        this.maxY = this.ctx.canvas.height - this.height;
    }

    isReady() {
        return this.img.isReady;
    }

    draw() {
        if (this.isReady()) {
            this.ctx.drawImage(
                this.img,
                this.x,
                this.y,
                this.width,
                this.height
            )
        }
    }
    
    move() {
        this.y += this.vy

        if (this.y + this.height >= this.ctx.canvas.height) {
            this.y = this.ctx.canvas.height - this.height;
            this.vy = 0;
        }
    }

}