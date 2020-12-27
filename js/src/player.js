class Player {
    constructor(ctx, x, y, width, height) {
        this.ctx = ctx;

        this.x = x;
        this.y = y;

        this.vx = 0;

        this.sprite = new Image();
        this.sprite.src = './images/lukeSprites.png';
        this.sprite.isReady = false;
        this.sprite.horizontalFrames = 2;
        this.sprite.verticalFrames = 3;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.verticalFrameIndex = 1;
        this.sprite.drawCount = 0;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
            this.width = this.sprite.frameWidth * 3;
            this.height = this.sprite.frameHeight * 3;
        }

        this.maxLeft = 0;
        this.maxRight = this.ctx.canvas.width;

        this.movements = {
            firing: false,
            right: false,
            left: false,
            facingRight: true,
            facingLeft: false
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
        this.player = null;
    }

    draw() {
        if (this.isReady()) {
            this.ctx.drawImage(
                this.sprite,
                this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
                this.sprite.verticalFrameIndex * this.sprite.frameHeight,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                this.x,
                this.y - 60,
                this.width,
                this.height
            )

            this.sprite.drawCount++;
            this.animate();

            this.bullets.forEach(bullet => bullet.draw(ctx, this.x, this.y));

            //Remove bullets when they dissapear fronm the canvas:
            this.bullets.forEach(bullet => {
                if (bullet.y < 0) {
                    this.bullets.shift();
                }
            });
        }
    }

    move() {
        this.x += this.vx;

        if (this.x + this.width >= this.maxRight) {
            this.x = this.maxRight - this.width;
        } else if (this.x <= this.maxLeft) {
            this.x = this.maxLeft;
        }

        this.bullets.forEach(bullet => bullet.move());
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

    // MI SOLUCIÓN
    collidesWith(element) {
        //console.log(`ball.x: ${Math.floor(element.x)}, ball.y: ${Math.floor(element.y)}, player.x: ${Math.floor(this.x)}, player.y: ${Math.floor(this.y)}`)
        // return this.y <= element.y + element.r &&
        //     this.x <= element.x + element.r &&
        //     element.x <= this.x + this.width;
        return this.x < element.x + element.r &&
            this.x + this.width > element.x &&
            this.y < element.y + element.r &&
            this.y + this.height > element.y
    }

    bulletCollidesWith(element) {
        return this.bullets.some(bullet => {
            return bullet.y <= element.y + element.r &&
                bullet.x <= element.x + element.r &&
                element.x <= bullet.x + bullet.width;
        });
    }

    // SOLUCIÓN STACK OVERFLOW
    // collidesWith(element) {
    //     const distX = Math.abs(element.x - this.x - this.width / 2);
    //     const distY = Math.abs(element.y - this.y - this.height / 2);

    //     if (distX > (this.width / 2 + element.r)) {
    //         return false;
    //     }
    //     if (distY > (this.height / 2 + element.r)) {
    //         return false;
    //     }

    //     if (distX <= (this.width / 2)) {
    //         return true;
    //     }
    //     if (distY <= (this.height / 2)) {
    //         return true;
    //     }

    //     var dx = distX - this.width / 2;
    //     var dy = distY - this.height / 2;
    //     return ((dx ** 2) + (dy ** 2) <= (element.r ** 2)); // Teorema de Pitágoras para comparar la distancia entre los centros del círculo y el cuadrado
    // }

    // bulletCollidesWith(element) {
    //     return this.bullets.some(bullet => {
    //         const distX = Math.abs(element.x - bullet.x - bullet.width / 2);
    //         const distY = Math.abs(element.y - bullet.y - bullet.height / 2);

    //         if (distX > (bullet.width / 2 + element.r)) {
    //             return false;
    //         }
    //         if (distY > (bullet.height / 2 + element.r)) {
    //             return false;
    //         }

    //         if (distX <= (bullet.width / 2)) {
    //             return true;
    //         }
    //         if (distY <= (bullet.height / 2)) {
    //             return true;
    //         }

    //         var dx = distX - bullet.width / 2;
    //         var dy = distY - bullet.height / 2;
    //         return ((dx ** 2) + (dy ** 2) <= (element.r ** 2)); // Teorema de Pitágoras para comparar la distancia entre los centros del círculo y el cuadrado
    //     })
    // }



}

class Player2 extends Player {
    constructor(ctx, x, y) {
        super(ctx, x, y)
        this.sprite.src = './images/stormtrooperSprites.png';

        this.sprite.verticalFrameIndex = 0;

        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
            this.width = this.sprite.frameWidth * 2;
            this.height = this.sprite.frameHeight * 2;
        }
    }


    draw() {
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

            this.bullets.forEach(bulletP2 => bulletP2.draw(ctx, this.x, this.y));

            //Remove bullets when they dissapear from the canvas:
            this.bullets.forEach(bullet => {
                if (bullet.y < 0) {
                    this.bullets.shift();
                }
            });
        }

    }


}