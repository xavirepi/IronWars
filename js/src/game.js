const timeFPS = 60;

class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.player = new Player(ctx, 50);

        this.bubbles = [
            new Bubble(ctx, this.ctx.canvas.width / 2, 100, 100, 'red', 2, 0.1)
        ];

        this.interval = null;
        this.fps = 1000 / 60;

        this.points = 0;
        this.time = 100;
        this.timeCount = 0;
    }

    start() {
        this.setListeners();

        if (!this.interval) {
            this.interval = setInterval(() => {
                this.clear();
                this.draw();
                this.move();
                this.checkCollisions();
                this.timeCount++;

                if (this.timeCount % timeFPS === 0) {
                    this.time--;
                }

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

        this.ctx.save();
        this.ctx.font = '30px Arial';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(`SCORE: ${this.points}`, 30, 50);
        this.ctx.restore();

        this.ctx.save();
        this.ctx.font = '30px Arial';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`TIME: ${this.time}`, this.ctx.canvas.width - 175, 50)
        this.ctx.restore()
    }75

    move() {
        this.player.move();
        this.bubbles.forEach(bubble => bubble.move());
    }

    setListeners() {
        this.player.setListeners();
    }

    splitBubble(bubble, idx) {
        // La bola tocada por la bala tiene que ser la que se meta en este método y se divida/elimine
        // Create 2 new balls half the size
        // 2nd generation ball 1
        this.player.bullets = [];
        if (bubble.r > 20) {
            this.bubbles.push(new Bubble(
                ctx, 
                bubble.x,
                bubble.y,
                bubble.r / 2,
                'pink',
                -2,
                -2
                ));
            // 2nd generation ball 2
            this.bubbles.push(new Bubble(
                ctx, 
                bubble.x,
                bubble.y,
                bubble.r / 2,
                'blue',
                2,
                -2
                ));
        }
        this.bubbles.splice(idx, idx+1);
        console.log(this.bubbles);

        // If ball.r < mainBall.r/5 --> Remove ball and don't create any more balls

        // ¿Mantengo la bola inicial para usar como referencia y la hago desaparecer manipulando el DOM?
        // ¿Creo un radio máximo o busco hacerlo escalable?

        // this.bubbles.shift(); // remove biggest ball;
        // Remove hit ball
    }

    checkCollisions() {
        if (this.bubbles.some(bubble => this.player.collidesWith(bubble))) {
            this.gameOver();
        }

        this.bubbles.forEach((bubble, idx) => {
            const bulletCollides = this.player.bulletCollidesWith(bubble);
            if (bulletCollides) {
                this.splitBubble(bubble, idx);
                
                this.player.canFire = false
                setTimeout(() => {
                    this.player.canFire = true;
                }, 200);

                if (bubble.r <= 25) {
                    console.log(bubble.r)
                    this.points += 100; // The smallest bubbles add +100 points
                } else {
                    this.points += 50;
                }
            }
        });
    }

}