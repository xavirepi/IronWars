class Player {
    constructor(ctx, size) {
        this.ctx = ctx;

        this.width = size;
        this.height = size;

        this.x = this.ctx.canvas.width / 2;
        this.y = this.ctx.canvas.height - 55;
        this.maxRight = this.ctx.canvas.width - this.width;
        this.maxLeft = 0;


        this.vx = 0;

        // Sprite
        // this.img = new Image();
        // this.img = new Image();
        // this.img.src = 'images/player.png';
        // this.img.isReady = false;
        // this.img.onload = () => {
        //     this.img.isReady = true;
        // }
    }

    isReady() {
        return this.img.isReady;
    }

    draw() {
        this.ctx.fillStyle = 'purple';
        this.ctx.fillRect(this.x, this.y, 50, 50);

        // if (this.isReady()) {
        //     // this.ctx.drawImage(
        //     //     this.img,
        //     //     this.x,
        //     //     this.y,
        //     //     this.width,
        //     //     this.height
        //     // );
        // }
    }

    move() {
        this.x += this.vx;
        if (this.x <= 0) {
            this.x = this.maxLeft;
        } else if (this.x >= this.maxRight) {
            this.x = this.maxRight;
        }
    }

}