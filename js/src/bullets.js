class Bullet {
    constructor(ctx, x, y, width, height) {
        this.ctx = ctx;
        
        this.width = width;
        this.height = height;

        this.x = x;
        this.y = y;

        this.vy = -5;
    }

    isReady() {
        return this.img.isReady;
    }

    draw() {
        // if(this.isReady) {
            this.ctx.save();

            this.ctx.fillStyle = 'green';
            this.ctx.fillRect(this.x, this.y, 5, 20);
    
            this.ctx.restore();
        // }

        // ELIMINAR BALAS 
    }

    move() {
        this.y += this.vy;
    }
}