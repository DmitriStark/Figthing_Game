class Sprite {
    constructor({
        position,
        imageSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 }
    }) {
        this.position = position;
        this.width = 50;
        this.height = 150;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.frameCurent = 0;
        this.frameElapsed = 0;
        this.frameHold = 5;
        this.offset = offset
        this.attackBox = {
            x: this.position.x,
            y: this.position.y
        }


    }
    draw() {
        ctx.drawImage(
            this.image,
            this.frameCurent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale)

    }
    animateFrames() {
        this.frameElapsed++
        if (this.frameElapsed % this.frameHold == 0) {
            if (this.frameCurent < this.framesMax - 1) {
                this.frameCurent++
            } else {
                this.frameCurent = 0;
            }

        }
    }
    update() {
        this.draw();
        this.animateFrames();

    }

}
////////////////////////////////////////////////////////////////////////////////////////////////////////


class fighter extends Sprite {
    constructor({
        position,
        velocity,
        color = "red",
        imageSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 },
        sprites,
        attackBox = {
            offset: {},
            width: undefined,
            height: undefined
        }
    }) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        })

        this.velocity = velocity;
        this.width = 50
        this.height = 150;
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
        this.color = color
        this.isAtacking;
        this.health = 100;
        this.frameCurent = 0;
        this.frameElapsed = 0;
        this.frameHold = 5;
        this.sprites = sprites;
        this.dead =false;
        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc

        }




    }
    // draw() {
    //     ctx.fillStyle = this.color;
    //     ctx.fillRect(this.position.x, this.position.y, 50, this.height)
    //     if (this.isAtacking) {

    //         ctx.fillStyle = "green"
    //         ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y,
    //             this.attackBox.width,
    //             this.attackBox.height)

    //     }

    // }
    update() {
        this.draw();
        if(!this.dead){
            this.animateFrames();

        }
        //attack box
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

        // ctx.fillRect(
        //     this.attackBox.position.x,
        //     this.attackBox.position.y,
        //     this.attackBox.width,
        //     this.attackBox.height
        // )

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y;
        //gravity function
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
            this.velocity.y = 0;
            this.position.y = 330;

        } else this.velocity.y += gravity;
    }

    atack() {
        this.switchsprite("attack1")
        this.isAtacking = true;

    }
    takeHit() {
        this.health -= 20;

        if (this.health <= 0) {
            this.switchsprite("death")
        } else {
            this.switchsprite("takeHit")

        }

    }
    switchsprite(sprite) {
        if (this.image === this.sprites.death.image){
                if(this.frameCurent === this.sprites.death.framesMax-1){
                    this.dead = true

                }
                console.log(this.dead)
            return

        
            
        }
        //overriding all other animation with the atack animation
        if (this.image === this.sprites.attack1.image && this.frameCurent < this.sprites.attack1.framesMax - 1) {
            return
        }
        //over rides animation when take hit
        if (
            this.image === this.sprites.takeHit.image && this.frameCurent < this.sprites.takeHit.framesMax - 1
        ) { return }

        switch (sprite) {
            case "idle":
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image;
                    this.framesMax = this.sprites.idle.framesMax
                    this.frameCurent = 0

                }

                break
            case "run":
                if (this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image;
                    this.framesMax = this.sprites.run.framesMax
                    this.frameCurent = 0


                }

                break
            case "jump":
                if (this.image !== this.sprites.jump.image)
                    this.image = this.sprites.jump.image;
                this.framesMax = this.sprites.jump.framesMax
                this.frameCurent = 0

                break
            case "fall":
                if (this.image !== this.sprites.fall.image)
                    this.image = this.sprites.fall.image;
                this.framesMax = this.sprites.fall.framesMax
                this.frameCurent = 0

                break
            case "fall":
                if (this.image !== this.sprites.fall.image)
                    this.image = this.sprites.fall.image;
                this.framesMax = this.sprites.fall.framesMax
                this.frameCurent = 0

                break
            case "attack1":
                if (this.image !== this.sprites.attack1.image)
                    this.image = this.sprites.attack1.image;
                this.framesMax = this.sprites.attack1.framesMax
                this.frameCurent = 0

                break
            case "takeHit":
                if (this.image !== this.sprites.takeHit.image)
                    this.image = this.sprites.takeHit.image;
                this.framesMax = this.sprites.takeHit.framesMax
                this.frameCurent = 0

                break
            case "death":
                if (this.image !== this.sprites.death.image)
                    this.image = this.sprites.death.image;
                this.framesMax = this.sprites.death.framesMax
                this.frameCurent = 0

                break
        }
    }
}