class Player2Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.player = new Player4 (ctx, this.ctx.canvas.width / 2, this.ctx.canvas.height - 100);

        this.bubbles = [
            // Player 1 starting point
            // new Bubble(ctx, this.ctx.canvas.width / 2, 100, 100, 'red', 2, 0.1),

            // Player 2 starting point
            new Bubble(ctx, this.ctx.canvas.width / 2 * 0.2, 100, 12.5, 'red', -2, 0.1),
            new Bubble(ctx, this.ctx.canvas.width / 2 * 0.4, 100, 12.5, 'red', -2, 0.1),
            new Bubble(ctx, this.ctx.canvas.width / 2 * 0.6, 100, 12.5, 'red', -2, 0.1),
            new Bubble(ctx, this.ctx.canvas.width / 2 * 0.8 , 100, 12.5, 'red', -2, 0.1),
            new Bubble(ctx, this.ctx.canvas.width / 2 * 1.2, 100, 12.5, 'red', 2, 0.1),
            new Bubble(ctx, this.ctx.canvas.width / 2 * 1.4, 100, 12.5, 'red', 2, 0.1),
            new Bubble(ctx, this.ctx.canvas.width / 2 * 1.6, 100, 12.5, 'red', 2, 0.1),
            new Bubble(ctx, this.ctx.canvas.width / 2 * 0.2, 100, 12.5, 'red', -2, 0.1),
            new Bubble(ctx, this.ctx.canvas.width / 2 * 0.4, 100, 12.5, 'red', -2, 0.1),
            new Bubble(ctx, this.ctx.canvas.width / 2 * 0.6, 100, 12.5, 'red', -2, 0.1),
            new Bubble(ctx, this.ctx.canvas.width / 2 * 0.8 , 100, 12.5, 'red', -2, 0.1),
            new Bubble(ctx, this.ctx.canvas.width / 2 * 1.2, 100, 12.5, 'red', 2, 0.1),
            new Bubble(ctx, this.ctx.canvas.width / 2 * 1.4, 100, 12.5, 'red', 2, 0.1),
            new Bubble(ctx, this.ctx.canvas.width / 2 * 1.6, 100, 12.5, 'red', 2, 0.1),
            new Bubble(ctx, this.ctx.canvas.width / 2 * 1.8, 100, 12.5, 'red', 2, 0.1)
        ];

        this.interval = null;
        this.fps = 1000 / 60;

        this.points = 0;
        this.time = 25;
        this.timeCount = 0;

        // Player 1 theme
        // const theme = new Audio('./sounds/Star-Wars-Duel-of-the-Fates.mp3');
        // theme.volume = 0.4;

        //Player 2 theme
        const theme = new Audio('./sounds/imperial-march.mp3');
        theme.volume = 0.4;

        const redAlert = new Audio('./sounds/redAlert.wav');
        redAlert.volume = 0.2;

        const bubbleBlast = new Audio('./sounds/bubbleBlast.wav');
        bubbleBlast.volume = 0.4;

        this.sounds = {
            theme,
            bubbleBlast,
            redAlert
        }

        this.pause = false;
    }

    start() {
        // this.draw();


        // this.ctx.save();
        // this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        // this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // this.ctx.font = '100px Arial';
        // this.ctx.fillStyle = 'white';
        // this.ctx.textAlign = 'center';
        // this.ctx.fillText(
        //     `Get Ready!`,
        //     this.ctx.canvas.width / 2,
        //     this.ctx.canvas.height / 2,
        // );
        // this.ctx.restore();

        // setTimeout(() => { // INTRO SET TIME OUT
        this.setListeners();

        if (!this.interval) {
            this.interval = setInterval(() => {
                this.sounds.theme.play();
                this.clear();
                this.draw();
                this.move();
                //this.checkCollisions(); // Player 1
                this.checkPlayer2Collisions(); // Player 2
                this.timeCount++;

                if (this.timeCount % time_FPS === 0) {
                    this.time--;
                    this.checkTime(); 
                    //this.gameWon(); // Player 1
                    this.player2gameWon(); // Player 2
                }

                // For every 25 seconds alive the player gets 100 extra points - They could be added at the end of the game
                if (this.timeCount % extraPoints_25SecBlock_FPS === 0 && this.time > 25) {
                    this.points += 100;
                }



                // this.sounds.theme.volume = 0.9; // Uncomment when Intro set time out is used

            }, this.fps)
        }
        //   }, 16000); // INTRO SET TIME OUT
    }

    // pauseGame() {
    //     clearInterval(this.interval);
    // }

    // resumeGame() {
    //     this.interval = game.;
    // }

    gameWon() {
        // setTimeout (() => {
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
        }
        // }, 2000);
    }

    gameOver() {
        // this.sounds.theme = null;
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
        if (this.time <= 3 && this.time >= 0) {
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
        this.bubbles.forEach(bubble => bubble.move());
        this.player.move();
    }

    setListeners() {
        this.player.setListeners();
        // document.onkeydown = event => {
        //     if (event.keyCode === SPACE_BAR) {
        //         this.pause = true
        //         !this.interval;
        //     }
        // }
    }

    splitBubble(bubble, idx) {
        this.player.bullets = [];
        if (bubble.r >= 20) {
            this.bubbles.push(new Bubble(
                ctx,
                bubble.x,
                bubble.y,
                bubble.r / 2,
                'red',
                -2,
                -2
            ));
            this.bubbles.push(new Bubble(
                ctx,
                bubble.x,
                bubble.y,
                bubble.r / 2,
                'red',
                2,
                -2
            ));
        }
        this.bubbles.splice(idx, idx + 1);
    }

    checkCollisions() {
        if (this.bubbles.some(bubble => this.player.collidesWith(bubble))) {
            this.gameOver();
        }

        this.bubbles.forEach((bubble, idx) => {
            const bulletCollides = this.player.bulletCollidesWith(bubble);
            if (bulletCollides) {
                if (!this.gameWon() || !this.gameOver()) {
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
            }
        });
    }

    checkTime() {
        if (this.time <= 0) {
            return this.gameOver();
        }
    }

    // stopBullets() {
    //     if (this.gameOver() || this.gameWon()) {
    //         this.player.canFire = false;
    //     }
    // }


    unSplitBubble(bubble, idx) {
        // this.player.bullets = [];
        // if (bubble.r >= 20) {
        //     this.bubbles.push(new Bubble(
        //         ctx,
        //         bubble.x,
        //         bubble.y,
        //         bubble.r * 2,
        //         'red',
        //         -2,
        //         -2
        //     ));
        //     this.bubbles.push(new Bubble(
        //         ctx,
        //         bubble.x,
        //         bubble.y,
        //         bubble.r / 2,
        //         'red',
        //         2,
        //         -2
        //     ));
        // }
        // this.bubbles.splice(idx, idx + 1);

        // FUNCIONA
        this.player.bullets = [];
        //if (bubble.r >=  50 && bubble.r < 100) {
            this.bubbles.push(new Bubble(
                ctx,
                bubble.x,
                bubble.y,
                bubble.r * 2,
                'red',
                -2,
                -4
            ));
            this.bubbles.splice(idx, idx + 1);

        // switch (true) {
        //     case bubble.r >= 100:
        //         continue;
        //         break;
        //     case bubble.r >= 50:
        //         this.bubbles.push(new Bubble(
        //             ctx,
        //             bubble.x,
        //             bubble.y,
        //             bubble.r * 2,
        //             'red',
        //             -2,
        //             -4
        //         ));
        //         this.bubbles.splice(idx, idx + 1);
        //         break;
        //     case bubble.r < 50:

        // }

    }

    checkPlayer2Collisions() {
        if (this.bubbles.some(bubble => this.player.collidesWith(bubble))) {
            //this.gameOver();
        }

        this.bubbles.forEach((bubble, idx) => {
            const bulletCollides = this.player.bulletCollidesWith(bubble);
            if (bulletCollides) {
                if (!this.gameWon() || !this.gameOver()) {
                    if (bubble.r < 100) {
                        this.sounds.bubbleBlast.currentTime = 0;
                        this.sounds.bubbleBlast.play();
                        this.unSplitBubble(bubble, idx);
    
                        if (bubble.r <= 20) {
                            this.points += 100; // The smallest bubbles add +100 points
                        } else {
                            this.points += 50;
                        }
                    }
                }
            }
        });
    }

    player2gameWon() {
        // setTimeout (() => {
        if (this.bubbles.length === 1 && this.bubbles[0].r == 100) {
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
        }
        // }, 2000);
    }    
}