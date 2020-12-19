const time_FPS = 60;
const extraPoints_25SecBlock_FPS = 1500;

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
        this.time = 25;
        this.timeCount = 0;

        const theme = new Audio('./sounds/Star-Wars-Duel-of-the-Fates.mp3');
        theme.volume = 0.2;

        const redAlert = new Audio('./sounds/redAlert.wav');
        redAlert.volume = 0.2;

        this.sounds = {
            theme,
            bubbleBlast: new Audio('./sounds/bubbleBlast.wav'),
            redAlert
        }
    }

    start() {
        this.setListeners();

        if (!this.interval) {
            this.sounds.theme.play();
            this.interval = setInterval(() => {
                this.clear();
                this.draw();
                this.move();
                this.checkCollisions();
                this.timeCount++;

                if (this.timeCount % time_FPS === 0) {
                    this.time--;
                    this.checkTime();
                }

                // For every 25 seconds alive the player gets 100 extra points - They could be added at the end of the game
                if (this.timeCount % extraPoints_25SecBlock_FPS === 0 && this.time > 25) {
                    this.points += 100;
                }

                this.gameWon();

            }, this.fps)
        }

    }

    gameWon() {
        if (this.bubbles.length === 0) {
            clearInterval(this.interval)
            this.ctx.save();
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

            this.ctx.font = '50px Arial';
            this.ctx.fillStyle = 'white';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(
                'YOU WON THE GAME!',
                this.ctx.canvas.width / 2,
                this.ctx.canvas.height / 2 - 30,
            );
            this.ctx.restore();

            setTimeout(() => {
                this.ctx.save();
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
          
                this.ctx.font = '36px Arial';
                this.ctx.fillStyle = 'white';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(
                  `Final Score: ${this.points}`,
                  this.ctx.canvas.width / 2,
                  this.ctx.canvas.height / 2 + 30,
                );
                this.ctx.restore();
              }, 1500);

              this.player.canFire = false;
        }
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
        this.ctx.fillText(`TIME: ${this.time}`, this.ctx.canvas.width - 175, 50);
        this.ctx.restore();

        // Final Countdown:
        if (this.time == 3 || this.time == 2 || this.time == 1) {
            this.sounds.redAlert.play();
            this.ctx.save();
            // this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            // this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    
            this.ctx.font = '100px Arial';
            this.ctx.fillStyle = 'red';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(
                `${this.time}`,
                this.ctx.canvas.width / 2,
                this.ctx.canvas.height / 2,
            );
            this.ctx.restore();
        }
    }

    move() {
        this.player.move();
        this.bubbles.forEach(bubble => bubble.move());
    }

    setListeners() {
        this.player.setListeners();
    }

    splitBubble(bubble, idx) {
        this.player.bullets = [];
        if (bubble.r >= 20) {
            this.bubbles.push(new Bubble(
                ctx,
                bubble.x,
                bubble.y,
                bubble.r / 2,
                'pink',
                -2,
                -2
            ));
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
        this.bubbles.splice(idx, idx + 1);
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
                this.sounds.bubbleBlast.currentTime = 0;
                this.sounds.bubbleBlast.play();
                this.splitBubble(bubble, idx);

                if (bubble.r <= 20) {
                    console.log(bubble.r)
                    this.points += 100; // The smallest bubbles add +100 points
                } else {
                    this.points += 50;
                }
            }
        });
    }

    checkTime() {
        if (this.time <= 0) {
            return this.gameOver();
        }
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
            this.ctx.canvas.height / 2 - 30,
        );
        this.ctx.restore();

        setTimeout(() => {
            this.ctx.save();
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      
            this.ctx.font = '36px Arial';
            this.ctx.fillStyle = 'white';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(
              `Final Score: ${this.points}`,
              this.ctx.canvas.width / 2,
              this.ctx.canvas.height / 2 + 30,
            );
            this.ctx.restore();
          }, 1500);
    }

    // stopBullets() {
    //     if (this.gameOver() || this.gameWon()) {
    //         this.player.canFire = false;
    //     }
    // }

}