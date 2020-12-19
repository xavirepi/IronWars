class Bubble {
    constructor(ctx, x, y, r, color, vx, vy) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.r = r;

        this.vx = vx;
        this.vy = vy;
        this.ay = 0.05; // acceleration

        this.color = color;
    }

    isReady() {
        return this.img.isReady;
    };

    draw() {
        this.ctx.save();

        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.restore();
    }

    move() {
        this.vy += this.ay;
        this.y += this.vy;

        this.x += this.vx;

        // Borders
        if (this.y + this.r >= this.ctx.canvas.height) {
            this.y = this.ctx.canvas.height - this.r
            this.vy *= -1
        }
      
        if (this.x + this.r >= this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - this.r
            this.vx *= -1
        }
      
        if (this.x - this.r <= 0) {
            this.x = this.r
            this.vx *= -1
        }

    }
}