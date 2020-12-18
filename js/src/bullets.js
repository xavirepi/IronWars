class Bullet {
    construtctor(ctx, x, y, width, height) {
        this.ctx = ctx;
        
        this.width = width;
        this.heigth = height;

        this.x = x;
        this.y = y;

        this.vy = -5;
    }

    isReady() {
        return this.img.isReady;
    }

    draw() {
        this.ctx.save();

        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        
        this.ctx.restore();
    }

    move() {
        this.y += this.vy;
    }
}