class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.player = new Player(ctx, 50);

        this.bullets = new Bullet(ctx, 5);

        this.bubbles = [
            new Bubble(ctx, 100, 100, 65, 'red')
        ];

        this.interval = null;
        this.fps = 1000 / 60;
    }

    start() {
        this.setListeners();

        if (!this.interval) {
            this.invertal = setInterval(() => {
                this.clear();
                this.draw();
                this.move();
            }, this.fps)
        }

        this.move();
    }

    pause() {

    }

    gameOver() {
        clearInterval(this.interval);
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
}