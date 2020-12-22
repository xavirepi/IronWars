class Player2Multi {
    constructor(ctx, x, y) {
        this.ctx = ctx;

        // this.width = size;
        // this.height = size;

        this.x = x;
        this.y = y;
        this.maxLeft = 0;
        this.maxRight = this.ctx.canvas.width;

        this.vx = 0;

        this.sprite = new Image();
        this.sprite.src = './images/stormtrooperSprites.png';
        this.sprite.isReady = false;
        this.sprite.horizontalFrames = 2;
        this.sprite.verticalFrames = 3;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.drawCount = 0;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
            this.width = this.sprite.frameWidth * 2;
            this.height = this.sprite.frameHeight * 2;
        }

        this.movements = {
            firing: false,
            right: false,
            left: false,
            facingRight: false,
            facingLeft: true
        }

        this.canFire = true;

        this.bullets = [];

        this.sounds = {
            laserBlast: new Audio('./sounds/laserBlast.wav')
        };

        const laserBlastVolume = this.sounds.laserBlast;
        laserBlastVolume.volume = 0.2;
    }

    isReady() {
        return this.sprite.isReady;
    }

    clear() {
        this.bullets = this.bullets.filter(bullet => bullet.y < 0)
    }

    draw() {
        // this.ctx.fillStyle = 'purple';
        // this.ctx.fillbullet(this.x, this.y, 50, 50);

        if (this.isReady()) {
            this.ctx.drawImage(
                this.sprite,
                this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
                this.sprite.verticalFrameIndex * this.sprite.frameHeight,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                this.x,
                this.y - 52,
                this.width,
                this.height
            )

            this.sprite.drawCount++;
            this.animate();

            this.bullets.forEach(bullet => {
                // bullet.draw(); // Player 1 bullet
                bullet.drawPlayer2Bullet(); // Player 2 bullet
            });

            //Remove bullets when they dissapear fronm the canvas:
            this.bullets.forEach(bullet => {
                if (bullet.y < 0) {
                    this.bullets.shift();
                }
            });
        }
    }

    move() {
        // if (this.movements.facingRight && event.keyCode === RIGHT_KEY) {
        //     this.x += this.vx;
        // } else if (this.movements.facingRight && event.keyCode === LEFT_KEY) {
        //     this.vx = -6.5;
        //     this.x += this.vx;
        // } else {
        //     this.x += 0;
        // }

        this.x += this.vx;

        this.bullets.forEach(bullet => bullet.move());

        if (this.x <= 0) {
            this.x = this.maxLeft;
        } else if (this.x + this.width >= this.maxRight) {
            this.x + this.sprite.width == this.maxRight;
        }
    }

    playerRunsRight() {
        if (this.sprite.drawCount % MOVEMENT_FRAMES === 0) {
            if (this.sprite.verticalFrameIndex >= this.sprite.verticalFrames - 1) {
                this.sprite.verticalFrameIndex = 1;
            } else {
                this.sprite.verticalFrameIndex++
            }
            this.sprite.drawCount = 0;
        }
    }

    playerRunsLeft() {
        if (this.sprite.drawCount % MOVEMENT_FRAMES === 0) {
            if (this.sprite.verticalFrameIndex >= this.sprite.verticalFrames - 1) {
                this.sprite.verticalFrameIndex = 1;
            } else {
                this.sprite.verticalFrameIndex++;
            }
            this.sprite.drawCount = 0;
        }
    }

    isFiring() {
        this.vx = 0;
        if (this.movements.facingRight) {
            this.sprite.verticalFrameIndex = 0;
            this.sprite.horizontalFrameIndex = 0;
        } else if (this.movements.facingLeft) {
            this.sprite.verticalFrameIndex = 0;
            this.sprite.horizontalFrameIndex = 1;
        }
    }

    animate() {
        if (this.movements.firing) {
            this.isFiring();
        } else if (this.movements.right) {
            this.playerRunsRight();
        } else if (this.movements.left) {
            this.playerRunsLeft();
        } else {
            this.resetAnimation();
        }
    }

    resetAnimation() {
        if (this.movements.facingRight) {
            this.sprite.horizontalFrameIndex = 0;
            this.sprite.verticalFrameIndex = 1;
        } else if (this.movements.facingLeft) {
            this.sprite.horizontalFrameIndex = 1;
            this.sprite.verticalFrameIndex = 1;
        }
    }

    setListeners() {
        document.onkeydown = event => {
            switch (event.keyCode) {
                case P2_RIGHT_KEY:
                    this.movements.facingLeft = false;
                    this.movements.facingRight = true;
                    this.movements.right = true;
                    this.vx = 6.5;
                    break;
                case P2_LEFT_KEY:
                    this.movements.facingRight = false;
                    this.movements.facingLeft = true;
                    this.movements.left = true;
                    this.vx = -6.5;
                    break;
                case P2_FIRE_KEY:
                    this.movements.firing = true;
                    if (this.canFire) {
                        this.isFiring();
                        this.bullets.push(new Bullet(
                            this.ctx,
                            this.x + this.width / 2,
                            this.y,
                            this.width,
                            this.height
                        ));
                        this.sounds.laserBlast.currentTime = 0;
                        this.sounds.laserBlast.play();
                        this.canFire = false;
                        setTimeout(() => {
                            this.canFire = true;
                        }, 200);
                    }
                    break;
            }
        }

        document.onkeyup = event => {
            switch (event.keyCode) {
                case P2_RIGHT_KEY:
                case P2_LEFT_KEY:
                case P2_FIRE_KEY:
                    this.movements.right = false;
                    this.movements.left = false;
                    this.movements.firing = false;
                    this.vx = 0;
                    break;
            }
        }
    }

    // MI SOLUCIÓN
    // collidesWith(element) {
    //     //console.log(`ball.x: ${Math.floor(element.x)}, ball.y: ${Math.floor(element.y)}, player.x: ${Math.floor(this.x)}, player.y: ${Math.floor(this.y)}`)
    //     return this.y <= element.y + element.r &&
    //         this.x <= element.x + element.r &&
    //         element.x <= this.x + this.width;
    // }

    // bulletCollidesWith(element) {
    //     return this.bullets.some(bullet => {
    //         return bullet.y <= element.y + element.r &&
    //             bullet.x <= element.x + element.r &&
    //             element.x <= bullet.x + bullet.width;
    //     });
    // }

    // SOLUCIÓN STACK OVERFLOW
    collidesWith(element) {
        const distX = Math.abs(element.x - this.x - this.width / 2);
        const distY = Math.abs(element.y - this.y - this.height / 2);

        if (distX > (this.width / 2 + element.r)) {
            return false;
        }
        if (distY > (this.height / 2 + element.r)) {
            return false;
        }

        if (distX <= (this.width / 2)) {
            return true;
        }
        if (distY <= (this.height / 2)) {
            return true;
        }

        var dx = distX - this.width / 2;
        var dy = distY - this.height / 2;
        return ((dx**2) + (dy**2) <= (element.r**2)); // Teorema de Pitágoras para comparar la distancia entre los centros del círculo y el cuadrado
    }

    bulletCollidesWith(element) {
        return this.bullets.some(bullet => {
            const distX = Math.abs(element.x - bullet.x - bullet.width / 2);
            const distY = Math.abs(element.y - bullet.y - bullet.height / 2);
    
            if (distX > (bullet.width / 2 + element.r)) {
                return false;
            }
            if (distY > (bullet.height / 2 + element.r)) {
                return false;
            }
    
            if (distX <= (bullet.width / 2)) {
                return true;
            }
            if (distY <= (bullet.height / 2)) {
                return true;
            }
    
            var dx = distX - bullet.width / 2;
            var dy = distY - bullet.height / 2;
            return ((dx**2) + (dy**2) <= (element.r**2)); // Teorema de Pitágoras para comparar la distancia entre los centros del círculo y el cuadrado
        })

    }

}