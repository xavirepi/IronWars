class Player {
    constructor(ctx, size) {
        this.ctx = ctx;

        this.width = size;
        this.height = size;

        this.x = this.ctx.canvas.width / 2;
        this.y = this.ctx.canvas.height - 55;
        this.maxRight = this.ctx.canvas.width - this.width;
        this.maxLeft = 0;


        this.vx = 0;

        this.sprite = new Image();
        this.sprite.src = './images/lukeSprites.png';
        this.sprite.isReady = false;
        this.sprite.horizontalFrames = 8;
        this.sprite.verticalFrames = 20;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.drawCount = 0
        this.sprite.onload = () => {
          this.sprite.isReady = true
          this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames)
          this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames)
          this.width = this.sprite.frameWidth
          this.height = this.sprite.frameHeight
        }

        this.canFire = true;
        this.isFiring = false;

        this.bullets = [];

        this.sounds = {
            laserBlast: new Audio('./sounds/laserBlast.wav')
        };

        const laserBlastVolume = this.sounds.laserBlast;
        laserBlastVolume.volume = 0.2;
    }

    isReady() {
        return this.img.isReady;
    }

    clear() {
        this.bullets = this.bullets.filter(bullet => bullet.y < 0)
    }

    draw() {
        this.ctx.fillStyle = 'purple';
        this.ctx.fillRect(this.x, this.y, 50, 50);

        // if (this.isReady()) {
        //     this.ctx.drawImage(
        //       this.sprite,
        //       this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
        //       this.sprite.verticalFrameIndex * this.sprite.frameHeight,
        //       this.sprite.frameWidth,
        //       this.sprite.frameHeight,
        //       this.x,
        //       this.y,
        //       this.width,
        //       this.height
        //     )
        // }
        this.bullets.forEach(bullet => bullet.draw());

        //Remove bullets when they dissapear fronm the canvas:
        this.bullets.forEach(bullet => {
            if (bullet.y < 0) {
                this.bullets.shift();
            }
        });
    }

    move() {
        this.x += this.vx;
        if (this.x <= 0) {
            this.x = this.maxLeft;
        } else if (this.x >= this.maxRight) {
            this.x = this.maxRight;
        }
        this.bullets.forEach(bullet => bullet.move());
    }

    setListeners() {
        document.onkeydown = event => {
            switch (event.keyCode) {
                case RIGHT_KEY:
                    this.vx = 6.5;
                    break;
                case LEFT_KEY:
                    this.vx = -6.5;
                    break;
                case FIRE_KEY:
                    if (this.canFire) {
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
                        console.log(this.bullets); // TEST
                    }
                    break;
            }
        }

        document.onkeyup = event => {
            switch (event.keyCode) {
                case RIGHT_KEY:
                case LEFT_KEY:
                    this.vx = 0;
                    break;
            }
        }
    }

    collidesWith(element) {
        //console.log(`ball.x: ${Math.floor(element.x)}, ball.y: ${Math.floor(element.y)}, player.x: ${Math.floor(this.x)}, player.y: ${Math.floor(this.y)}`)
        return this.y <= element.y + element.r &&
            this.x <= element.x + element.r &&
            element.x <= this.x + this.width;
    }

    bulletCollidesWith(element) {
        return this.bullets.some(bullet => {
            return bullet.y <= element.y + element.r &&
                   bullet.x <= element.x + element.r &&
                   element.x <= bullet.x + bullet.width;
        });
    }

}