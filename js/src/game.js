class MultiPlayerGame {
    constructor(ctx, player1, player2) {
        this.ctx = ctx;

        if (player1) {
            this.player = new player1(ctx, this.ctx.canvas.width * 0.25, this.ctx.canvas.height - 100);
            this.points = 0;
            this.lives = 3;
            this.lifeAvatar = new Image();
            this.lifeAvatar.src = './images/lukeAvatar.png';
        }

        if (player2) {
            this.player2 = new player2(ctx, this.ctx.canvas.width * 0.75, this.ctx.canvas.height - 100);
            this.player2.movements.facingLeft = true;
            this.player2.movements.facingRight = false;
            this.p2Points = 0;
            this.p2Lives = 3;
            this.p2LifeAvatar = new Image();
            this.p2LifeAvatar.src = './images/stormtrooperAvatar.png';
        }

        this.bubbles = [
            new Bubble(ctx, this.ctx.canvas.width / 2 * 0.2, 100, 12.5, 'red', -2, 0.1),
            new Bubble(ctx, this.ctx.canvas.width / 2 * 0.4, 100, 12.5, 'red', -2, 0.1),
            new Bubble(ctx, this.ctx.canvas.width / 2 * 0.6, 100, 12.5, 'red', -2, 0.1),
            new Bubble(ctx, this.ctx.canvas.width / 2 * 0.8, 100, 12.5, 'red', -2, 0.1),
            new Bubble(ctx, this.ctx.canvas.width / 2 * 1.2, 100, 12.5, 'red', 2, 0.1),
            new Bubble(ctx, this.ctx.canvas.width / 2 * 1.4, 100, 12.5, 'red', 2, 0.1),
            new Bubble(ctx, this.ctx.canvas.width / 2 * 1.6, 100, 12.5, 'red', 2, 0.1),
            new Bubble(ctx, this.ctx.canvas.width / 2 * 0.2, 100, 12.5, 'red', -2, 0.1),
            new Bubble(ctx, this.ctx.canvas.width / 2 * 0.4, 100, 12.5, 'red', -2, 0.1),
            new Bubble(ctx, this.ctx.canvas.width / 2 * 0.6, 100, 12.5, 'red', -2, 0.1),
            new Bubble(ctx, this.ctx.canvas.width / 2 * 0.8, 100, 12.5, 'red', -2, 0.1),
            new Bubble(ctx, this.ctx.canvas.width / 2 * 1.2, 100, 12.5, 'red', 2, 0.1),
            new Bubble(ctx, this.ctx.canvas.width / 2 * 1.4, 100, 12.5, 'red', 2, 0.1),
            new Bubble(ctx, this.ctx.canvas.width / 2 * 1.6, 100, 12.5, 'red', 2, 0.1),
            new Bubble(ctx, this.ctx.canvas.width / 2 * 1.8, 100, 12.5, 'red', 2, 0.1)
        ];

        this.interval = null;
        this.fps = 1000 / 60;
        this.time = 30;
        this.timeCount = 0;

        let theme = new Audio('./sounds/Star-Wars-Duel-of-the-Fates.mp3');
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

        this.paused = false;
        this.reset = false;
    }

    start() {
        // this.draw();

        // this.ctx.save();
        // this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        // this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // this.ctx.font = '100px "Press Start 2P"';
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
                this.clear();
                this.draw();
                if (!this.paused) {
                    this.sounds.theme.play();
                    this.move();
                    this.checkCollisions();
                    this.timeCount++;

                    if (this.timeCount % time_FPS === 0) {
                        this.time--;
                        this.checkTime();
                        this.gameWon();
                    }

                    // For every 25 seconds alive the player gets 100 extra points - They could be added at the end of the game
                    if (this.timeCount % extraPoints_25SecBlock_FPS === 0 && this.time > 25) {
                        this.points += 100;

                        if (this.player2) {
                            this.p2Points += 100;
                        }
                    }
                }

            }, this.fps)
        }
        //   }, 16000); // INTRO SET TIME OUT
    }

    pauseGame() {
        if (!this.paused) {
            this.paused = true;
            document.getElementById('main-menu').classList.remove("hidden");
            document.getElementById("pause-game").classList.add("hidden");
            document.getElementById("help").classList.remove("hidden");
        } else if (this.paused && document.getElementById('help-info').classList.contains("hidden")) {
            this.paused = false;
            document.getElementById('main-menu').classList.add("hidden");
            document.getElementById("pause-game").classList.remove("hidden");
            document.getElementById("help").classList.add("hidden");
        }
    }

    gameWon() {
        // setTimeout (() => {

        // Player 1 Game Won
        if (this.bubbles.length === 0) {
            clearInterval(this.interval);
            this.ctx.save();
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

            this.ctx.font = '50px "Press Start 2P"';
            this.ctx.fillStyle = 'white';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(
                'THE LIGHT SIDE OF THE FORCE WON!',
                this.ctx.canvas.width / 2,
                this.ctx.canvas.height / 2 - 30,
            );
            this.ctx.restore();

            setTimeout(() => {
                this.ctx.save();
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

                this.ctx.font = '36px "Press Start 2P"';
                this.ctx.fillStyle = 'white';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(
                    `Light Side Final Score:${this.points}`,
                    this.ctx.canvas.width / 2,
                    this.ctx.canvas.height / 2 + 25,
                );

                this.ctx.font = '36px "Press Start 2P"';
                this.ctx.fillStyle = 'white';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(
                    `Dark Side Final Score:${this.p2Points}`,
                    this.ctx.canvas.width / 2,
                    this.ctx.canvas.height / 2 + 75,
                );
                this.ctx.restore();

            }, 1500);
        }

        // Player 2 Game Won
        if (this.bubbles.length === 1 && this.bubbles[0].r == 100) {
            clearInterval(this.interval)
            this.ctx.save();
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

            this.ctx.font = '50px "Press Start 2P"';
            this.ctx.fillStyle = 'white';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(
                'THE DARK SIDE OF THE FORCE WON!',
                this.ctx.canvas.width / 2,
                this.ctx.canvas.height / 2 - 30,
            );
            this.ctx.restore();

            setTimeout(() => {
                this.ctx.save();
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

                this.ctx.font = '36px "Press Start 2P"';
                this.ctx.fillStyle = 'white';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(
                    `Dark Side Final Score: ${this.points}`,
                    this.ctx.canvas.width / 2,
                    this.ctx.canvas.height / 2 + 60,
                );
                this.ctx.restore();

                this.ctx.save();
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
                this.ctx.font = '36px "Press Start 2P"';
                this.ctx.fillStyle = 'white';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(
                    `Light Side Final Score: ${this.points}`,
                    this.ctx.canvas.width / 2,
                    this.ctx.canvas.height / 2 + 30,
                );
                this.ctx.restore();

            }, 1500);
        }
        // }, 2000);
    }

    substractLife() { // HACER QUE EL JUGADOR SALTE FUERA DEL JUEGO
        if (this.player) {
            console.log('player 1 substractLife')
            if (this.lives >= 1) {
                this.gameReset();
                this.lives--;
            } else if (this.lives <= 0) {
                this.gameOver();
            }
        }

        if (this.player2) {
            console.log('player 2 substractLife')
            if (this.p2Lives >= 1) {
                this.gameReset();
                this.p2Lives--;
            } else if (this.p2Lives <= 0) {
                this.gameOver();
            }
        }
    }

    gameReset() {
        clearInterval(this.interval);
        // this.paused = true;
        setTimeout(() => {
            this.clear();
            this.draw();
            this.interval = setInterval(() => {
                this.clear();
                this.draw();
                if (!this.paused) {
                    this.sounds.theme.play();
                    this.move();
                    this.checkCollisions();
                    this.timeCount++;

                    if (this.timeCount % time_FPS === 0) {
                        this.time--;
                        this.checkTime();
                        this.gameWon();
                    }

                    // For every 25 seconds alive the player gets 100 extra points - They could be added at the end of the game
                    if (this.timeCount % extraPoints_25SecBlock_FPS === 0 && this.time > 25) {
                        this.points += 100;

                        if (this.player2) {
                            this.p2Points += 100;
                        }
                    }
                }

            }, this.fps)
        }, 3000);
    }

    gameOver() { //If any player hit is game over
        if (this.lives === 0 && this.p2Lives === 0) {
            clearInterval(this.interval);
            this.ctx.save();
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(0, 0, this.ctx.canvas.width + 2, this.ctx.canvas.height + 2);

            this.ctx.font = '36px "Press Start 2P"';
            this.ctx.fillStyle = 'white';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(
                'GAME OVER',
                this.ctx.canvas.width / 2,
                this.ctx.canvas.height / 2 - 30,
            );
            this.ctx.restore();

            setTimeout(() => {
                this.ctx.save();
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

                this.ctx.font = '36px "Press Start 2P"';
                this.ctx.fillStyle = 'white';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(
                    `Light Side Score: ${this.points}`,
                    this.ctx.canvas.width / 2,
                    this.ctx.canvas.height / 2 + 25,
                );

                if (this.player2) {
                    this.ctx.font = '36px "Press Start 2P"';
                    this.ctx.fillStyle = 'white';
                    this.ctx.textAlign = 'center';
                    this.ctx.fillText(
                        `Dark Side Score: ${this.p2Points}`,
                        this.ctx.canvas.width / 2,
                        this.ctx.canvas.height / 2 + 80,
                    );
                }
                this.ctx.restore();
            }, 2000);
        }
        // else {
        //     //this.start();
        // }

    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    draw() {
        this.bubbles.forEach(bubble => bubble.draw());

        if (this.paused) {
            this.ctx.save();
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(0, 0, this.ctx.canvas.width + 2, this.ctx.canvas.height + 2);

            this.ctx.font = '30px "Press Start 2P"';
            this.ctx.fillStyle = 'white';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(
                'PRESS SPACE BAR TO RESUME GAME',
                this.ctx.canvas.width / 2,
                this.ctx.canvas.height / 2,
            );
            this.ctx.restore();
        }

        if (this.player) {
            this.player.draw();
            this.ctx.drawImage(this.lifeAvatar, this.ctx.canvas.width - 100, 5, 45, 50);
            // PLAYER 1 SCORE
            this.ctx.save();
            this.ctx.font = 'bold 18px "Press Start 2P"';
            this.ctx.fillStyle = 'white';
            this.ctx.fillText(`LIGHT SIDE SCORE:${this.points}`, 30, 40);
            this.ctx.fillText(`x${this.lives}`, this.ctx.canvas.width - 55, 40)
            this.ctx.restore();
            // this.lives.forEach(life => life.draw())
        }

        if (this.player2) {
            this.player2.draw();
            this.ctx.drawImage(this.p2LifeAvatar, this.ctx.canvas.width - 205, 9, 45, 42);
            // PLAYER 2 SCORE
            this.ctx.save();
            this.ctx.font = '18px "Press Start 2P"';
            this.ctx.fillStyle = 'white';
            this.ctx.fillText(`DARK SIDE SCORE:${this.p2Points}`, 30, 80);
            this.ctx.fillText(`x${this.p2Lives}`, this.ctx.canvas.width - 155, 40)
            this.ctx.restore();
            // this.p2Lives.forEach(life => life.draw())
        }

        // COUNTDOWN
        this.ctx.save();
        this.ctx.font = '18px "Press Start 2P"';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`TIME:${this.time}`, this.ctx.canvas.width / 2, 40);
        this.ctx.restore();

        // Final Countdown:
        if (this.time <= 3 && this.time >= -1) {
            this.sounds.redAlert.play();
            this.ctx.save();
            // this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            // this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

            this.ctx.font = '100px "Press Start 2P"';
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

        if (this.player) {
            this.player.move();
        }
        if (this.player2) {
            this.player2.move();
        }
    }

    //CONTROLS
    setListeners() {
        document.onkeydown = event => {
            event.preventDefault();
            if (event.keyCode === SPACE_BAR) {
                this.pauseGame();
            }
            // PLAYER 1 CONTROLS - KEYBOARD
            if (this.player) {
                switch (event.keyCode) {
                    case RIGHT_KEY:
                        this.player.movements.facingLeft = false;
                        this.player.movements.facingRight = true;
                        this.player.movements.right = true;
                        this.player.vx = 6.5;
                        break;
                    case LEFT_KEY:
                        this.player.movements.facingRight = false;
                        this.player.movements.facingLeft = true;
                        this.player.movements.left = true;
                        this.player.vx = -6.5;
                        break;
                    case FIRE_KEY:
                        this.player.movements.firing = true;
                        if (this.player.canFire) {
                            this.player.isFiring();
                            this.player.bullets.push(new Bullet(
                                this.player.ctx,
                                this.player.x + this.player.width / 2 - 7,
                                this.player.y - 105,
                                this.player.width,
                            ));
                            this.player.sounds.laserBlast.currentTime = 0;
                            this.player.sounds.laserBlast.play();
                            this.player.canFire = false;
                            setTimeout(() => {
                                this.player.canFire = true;
                            }, 200);
                        }
                        break;
                }
            }

            // PLAYER 2 CONTROLS - KEYBOARD
            if (this.player2) {
                switch (event.keyCode) {
                    case P2_RIGHT_KEY:
                        this.player2.movements.facingLeft = false;
                        this.player2.movements.facingRight = true;
                        this.player2.movements.right = true;
                        this.player2.vx = 6.5;
                        break;
                    case P2_LEFT_KEY:
                        this.player2.movements.facingRight = false;
                        this.player2.movements.facingLeft = true;
                        this.player2.movements.left = true;
                        this.player2.vx = -6.5;
                        break;
                    case P2_FIRE_KEY:
                        this.player2.movements.firing = true;
                        if (this.player2.canFire) {
                            this.player2.isFiring();
                            this.player2.bullets.push(new BulletP2(
                                this.player2.ctx,
                                this.player2.x + this.player2.width / 2 - 7,
                                this.player2.y - 105,
                                this.player2.width,
                                this.player2.height
                            ));
                            this.player2.sounds.laserBlast.currentTime = 0;
                            this.player2.sounds.laserBlast.play();
                            this.player2.canFire = false;
                            setTimeout(() => {
                                this.player2.canFire = true;
                            }, 200);
                        }
                        break;
                }
            }
        }

        document.onkeyup = event => {
            if (this.player) {
                switch (event.keyCode) {
                    case RIGHT_KEY:
                    case LEFT_KEY:
                    case FIRE_KEY:
                        this.player.movements.right = false;
                        this.player.movements.left = false;
                        this.player.movements.firing = false;
                        this.player.vx = 0;
                        break;
                }
            }

            if (this.player2) {
                switch (event.keyCode) {
                    case P2_RIGHT_KEY:
                    case P2_LEFT_KEY:
                    case P2_FIRE_KEY:
                        this.player2.movements.right = false;
                        this.player2.movements.left = false;
                        this.player2.movements.firing = false;
                        this.player2.vx = 0;
                        break;
                }
            }

        }

        // PLAYER 2 CONTROLS (ON MULTIPLAYER) - MOUSE
        if (this.player && this.player2 === null) {
            this.ctx.canvas.onclick = (event) => {
                event.preventDefault();
                // PLAYER 1 CONTROLS
                if (this.player && this.player2 === null) {
                    this.player.movements.firing = true;
                    if (this.player.canFire) {
                        this.player.isFiring();
                        this.player.bullets.push(new Bullet(
                            this.player.ctx,
                            this.player.x + this.player.width / 2,
                            this.player.y,
                            this.player.width,
                        ));
                        this.player.sounds.laserBlast.currentTime = 0;
                        this.player.sounds.laserBlast.play();
                        this.player.canFire = false;
                        setTimeout(() => {
                            this.player.canFire = true;
                        }, 200);
                    }
                }
            }
        }

        if (this.player && this.player2) {
            // P2 MOVEMENT
            this.ctx.canvas.onmouseover = (event) => {
                console.log(event);
            }
            // P2 FIRE
            this.ctx.canvas.onclick = (event) => {
                //console.log(event)
                this.player2.movements.firing = true;
                if (this.player2.canFire) {
                    this.player2.isFiring();
                    this.player2.bullets.push(new BulletP2(
                        this.player2.ctx,
                        this.player2.x + this.player2.width / 2,
                        this.player2.y,
                        this.player2.width,
                        this.player2.height
                    ));
                    this.player2.sounds.laserBlast.currentTime = 0;
                    this.player2.sounds.laserBlast.play();
                    this.player2.canFire = false;
                    setTimeout(() => {
                        this.player2.canFire = true;
                    }, 200);
                }
            }
        }

        // GAMEPAD
        gamepadAPI.buttonPressed('A', 'hold');
    }

    splitBubble(bubble, idx) {
        if (this.player) {
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

        if (this.player2) {
            this.player2.bullets = [];
            if (bubble.r <= 100) {
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
            }
        }
    }

    checkCollisions() {
        if (this.player) {
            console.log('player 1 checkCollision multiplayerGame')
            if (this.bubbles.some(bubble => this.player.collidesWith(bubble))) {
                this.substractLife();
            };

            this.bubbles.forEach((bubble, idx) => {
                const bulletCollides = this.player.bulletCollidesWith(bubble);
                if (bulletCollides) {
                    if (!this.gameWon() || !this.gameOver()) {
                        this.sounds.bubbleBlast.currentTime = 0;
                        this.sounds.bubbleBlast.play();
                        this.splitBubble(bubble, idx);

                        if (bubble.r <= 20) {
                            this.points += 100; // The smallest bubbles add +100 points
                        } else {
                            this.points += 50;
                        }
                    }
                }
            });
        }


        if (this.player2) {
            console.log('player 2 checkCollision multiplayerGame')
            if (this.bubbles.some(bubble => this.player2.collidesWith(bubble))) {
                this.substractLife();
            };
            this.bubbles.forEach((bubble, idx) => {
                const bulletCollides = this.player2.bulletCollidesWith(bubble);
                if (bulletCollides) {
                    if (!this.gameWon() || !this.gameOver()) {
                        if (bubble.r < 100) {
                            this.sounds.bubbleBlast.currentTime = 0;
                            this.sounds.bubbleBlast.play();
                            this.splitBubble(bubble, idx);

                            if (bubble.r <= 20) {
                                this.p2Points += 100; // The smallest bubbles add +100 points
                            } else {
                                this.p2Points += 50;
                            }
                        }
                    }
                }
            });
        }
    }

    checkTime() {
        if (this.time <= 0 && !this.gameWon()) {
            clearInterval(this.interval)
            this.ctx.save();
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

            this.ctx.font = '30px "Press Start 2P"';
            this.ctx.fillStyle = 'white';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(
                'THE DARK SIDE OF THE FORCE WON!',
                this.ctx.canvas.width / 2,
                this.ctx.canvas.height / 2 - 30,
            );
            this.ctx.restore();

            setTimeout(() => {
                this.ctx.save();
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

                this.ctx.font = '36px "Press Start 2P"';
                this.ctx.fillStyle = 'white';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(
                    `Dark Side Final Score: ${this.p2Points}`,
                    this.ctx.canvas.width / 2,
                    this.ctx.canvas.height / 2 + 60,
                );
                this.ctx.restore();

                this.ctx.save();
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
                this.ctx.font = '36px "Press Start 2P"';
                this.ctx.fillStyle = 'white';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(
                    `Light Side Final Score: ${this.points}`,
                    this.ctx.canvas.width / 2,
                    this.ctx.canvas.height / 2 + 30,
                );
                this.ctx.restore();

            }, 1500);
        }
    }

}

// SINGLE PLAYER LIGHT SIDE GAME
class Game extends MultiPlayerGame {
    constructor(ctx, player) {
        super(ctx, player);

        this.bubbles = [
            new Bubble(ctx, this.ctx.canvas.width / 2, 100, 100, 'red', 2, 0.1)
        ];

        this.sounds.theme = new Audio('./sounds/Star-Wars-Duel-of-the-Fates.mp3');
    }

    gameWon() {
        if (this.bubbles.length === 0) {
            clearInterval(this.interval)
            this.ctx.save();
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

            this.ctx.font = '40px "Press Start 2P"';
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

                this.ctx.font = '36px "Press Start 2P"';
                this.ctx.fillStyle = 'white';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(
                    `Final Score:${this.points}`,
                    this.ctx.canvas.width / 2,
                    this.ctx.canvas.height / 2 + 40,
                );
                this.ctx.restore();
            }, 1500);
        }
    }

}

// SINGLE PLAYER DARK SIDE GAME
class Game2 extends MultiPlayerGame {
    constructor(ctx, player1, player2) {
        super(ctx, player1, player2);

        this.sounds.theme = new Audio('./sounds/imperial-march.mp3');
    }

    // move() {
    //     this.player = this.player2;
    //     super.move();
    // }

    // checkCollisions() {
    //     super.checkCollisions();

    //     this.bubbles.forEach((bubble, idx) => {
    //         const bulletCollides = this.player2.bulletCollidesWith(bubble);
    //         if (bulletCollides) {
    //             if (!this.gameWon() || !this.gameOver()) {
    //                 if (bubble.r < 100) {
    //                     this.sounds.bubbleBlast.currentTime = 0;
    //                     this.sounds.bubbleBlast.play();
    //                     this.splitBubble(bubble, idx);

    //                     if (bubble.r <= 20) {
    //                         this.points += 100; // The smallest bubbles add +100 points
    //                     } else {
    //                         this.points += 50;
    //                     }
    //                 }
    //             }
    //         }
    //     });

    // }

    gameWon() {
        if (this.bubbles.length === 1 && this.bubbles[0].r == 100) {
            clearInterval(this.interval)
            this.ctx.save();
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

            this.ctx.font = '40px "Press Start 2P"';
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

                this.ctx.font = '36px "Press Start 2P"';
                this.ctx.fillStyle = 'white';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(
                    `Final Score:${this.p2Points}`,
                    this.ctx.canvas.width / 2,
                    this.ctx.canvas.height / 2 + 40,
                );
                this.ctx.restore();
            }, 1500);
        }
    }

    draw() {
        this.bubbles.forEach(bubble => bubble.draw());



        if (this.paused) {
            this.ctx.save();
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

            this.ctx.font = '30px "Press Start 2P"';
            this.ctx.fillStyle = 'white';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(
                'PRESS SPACE BAR TO RESUME GAME',
                this.ctx.canvas.width / 2,
                this.ctx.canvas.height / 2,
            );
            this.ctx.restore();
        }

        this.player2.draw();
        this.ctx.drawImage(this.p2LifeAvatar, this.ctx.canvas.width - 110, 9, 45, 42);
        // PLAYER 1 SCORE
        this.ctx.save();
        this.ctx.font = '18px "Press Start 2P"';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`SCORE:${this.p2Points}`, 30, 40);
        this.ctx.fillText(`x${this.p2Lives}`, this.ctx.canvas.width - 55, 40)
        this.ctx.restore();

        // COUNTDOWN
        this.ctx.save();
        this.ctx.font = '18px "Press Start 2P"';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`TIME:${this.time}`, this.ctx.canvas.width / 2, 40);
        this.ctx.restore();

        // Final Countdown:
        if (this.time <= 3 && this.time >= -1) {
            this.sounds.redAlert.play();
            this.ctx.save();
            // this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            // this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

            this.ctx.font = '100px "Press Start 2P"';
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

    splitBubble(bubble, idx) {
        this.player2.bullets = [];
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
    }
}