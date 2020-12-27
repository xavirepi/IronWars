class Bullet {
    constructor(ctx, x, y, width, height) {
        this.ctx = ctx;

        // this.width = width;
        // this.height = height;

        this.x = x;
        this.y = y;

        this.vy = -5;

        this.img = new Image();
        this.img.src = './images/greenBeam.png';
        this.img.isReady = false;
        this.img.onload = () => {
            this.img.isReady = true;
            this.width = 15;
            this.height = 65;
        }
    }

    isReady() {
        return this.img.isReady;
    }

    draw() {
        if (this.isReady()) {
            // this.ctx.save();

            // this.ctx.fillStyle = 'green';
            // this.ctx.fillRect(this.x, this.y, 5, 20);

            // this.ctx.restore();

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
        this.y += this.vy;
    }
}

class BulletP2 extends Bullet {
    constructor(ctx, x, y, width, height) {
        super(ctx, x, y, width, height);

        this.img.src = './images/redBeam.png';
        this.img.isReady = false;
        this.img.onload = () => {
            this.img.isReady = true;
            this.width = 10;
            this.height = 55;
        }
    }

    draw() {
        if (this.isReady()) {
            // this.ctx.save();

            // this.ctx.fillStyle = 'green';
            // this.ctx.fillRect(this.x, this.y, 5, 20);

            // this.ctx.restore();

            this.ctx.drawImage(
                this.img,
                this.x,
                this.y,
                this.width,
                this.height
            )
        }
    }


}