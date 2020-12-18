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

        this.canFire = true;

        this.bullets = [];
    }

    isReady() {
        return this.img.isReady;
    }

    // clear() {
    //     this.bullets = this.bullets.filter(bullet => bullet.y >= this.ctx.canvas.y)
    // }

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

        this.bullets.forEach(bullet => bullet.draw());
    }

    move() {
        this.bullets.forEach(bullet => bullet.move());
        this.x += this.vx;
        if (this.x <= 0) {
            this.x = this.maxLeft;
        } else if (this.x >= this.maxRight) {
            this.x = this.maxRight;
        }
    }

    setListeners() {
        document.onkeydown = event => {
            switch (event.keyCode) {
                case RIGHT_KEY:
                    this.vx = 6.5;
                    break;
                case LEFT_KEY:
                    this.vx = -6.5;
                    break;
                case FIRE_KEY:
                    if (this.canFire) {
                        this.bullets.push(new Bullet(
                            this.ctx, 
                            this.x + this.width / 2,
                            this.y,
                            this.width, 
                            this.height)
                            );
                        this.canFire = false;
                        setTimeout(() => {
                            this.canFire = true;
                        }, 200);
                        console.log(this.bullets)
                    }
                    break;
            }
        }

        document.onkeyup = event => {
            switch (event.keyCode) {
                case RIGHT_KEY:
                case LEFT_KEY:
                    this.vx = 0;
                    break;
            }
        }
    }

}
