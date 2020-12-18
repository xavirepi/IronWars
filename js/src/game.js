class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.player = new Player(ctx, 50);

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
        this.player.draw(this.ctx, this.player.x, this.player.y, 75);
    }

    move() {
        this.player.move();
    }

    setListeners() {
        document.onkeydown = event => {
            if (event.keyCode === RIGHT) {
                this.player.vx = 6;
                console.log('moving right')
                console.log(this.player.vx)
            };
            if (event.keyCode === LEFT) {
                this.player.vx = -6;
                console.log('moving left')
                console.log(this.player.vx)
            };
        }

        document.onkeyup = event => {
            if (event.keyCode === RIGHT || LEFT) {
              this.player.vx = 0;
            };
        }
    }
}

const RIGHT = 39;
const LEFT = 37;