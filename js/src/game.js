class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.player = new Player(ctx, 50);

        this.bubbles = [
            new Bubble(ctx, this.ctx.canvas.width / 2, 100, 65, 'red')
        ];

        this.interval = null;
        this.fps = 1000 / 60;
    }

    start() {
        this.setListeners();

        if (!this.interval) {
            this.interval = setInterval(() => {
                this.clear();
                this.draw();
                this.move();
                this.checkCollisions();
            }, this.fps)
        }
    }

    pause() {

    }

    gameOver() {
        clearInterval(this.interval);

        this.ctx.save();
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.ctx.font = '36px Arial';
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(
            'GAME OVER!',
            this.ctx.canvas.width / 2,
            this.ctx.canvas.height / 2,
        );
        this.ctx.restore();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    draw() {
        this.player.draw();
        this.bubbles.forEach(bubble => bubble.draw());
    }

    move() {
        this.player.move();
        this.bubbles.forEach(bubble => bubble.move());
    }

    setListeners() {
        this.player.setListeners();
    }

    checkCollisions() {
        if (this.bubbles.some(bubble => this.player.collidesWith(bubble))) {
            this.gameOver();
        }

        // if (this.bubbles.)
    }

}