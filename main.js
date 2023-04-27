const canvas = document.getElementById("canvas1")
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.7;





///////////////////////////////////////////
const backGround = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: "./img/background.png",
})
const shop = new Sprite({
    position: {
        x: 600,
        y: 128
    },
    imageSrc: "./img/shop.png",
    scale: 2.75,
    framesMax: 6

})

const player = new fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 5

    },
    offset: {
        x: 0,
        y: 0
    },
    imageSrc: "./img/samuraiMack/Idle.png",
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 157
    },
    sprites: {
        idle: {
            imageSrc: "./img/samuraiMack/Idle.png",
            framesMax: 8
        },
        run: {
            imageSrc: "./img/samuraiMack/Run.png",
            framesMax: 8

        },
        jump: {
            imageSrc: "./img/samuraiMack/Jump.png",
            framesMax: 2

        },
        fall: {
            imageSrc: "./img/samuraiMack/Fall.png",
            framesMax: 2
        },
        attack1: {
            imageSrc: "./img/samuraiMack/Attack1.png",
            framesMax: 6
        },
        takeHit: {
            imageSrc: "./img/samuraiMack/Take Hit - white silhouette.png",
            framesMax: 4
        },
        death: {
            imageSrc: "./img/samuraiMack/Death.png",
            framesMax: 6
        }
    },
    attackBox: {
        offset: {
            x: 100,
            y: 50
        },
        width: 160,
        height: 50
    }
});
const enemy = new fighter({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0

    }
    , offset: {
        x: 50,
        y: 0
    }
    , color: "blue",
    imageSrc: "./img/kenji/Idle.png",
    framesMax: 4,
    scale: 2.5,
    offset: {
        x: 215,
        y: 167
    },
    sprites: {
        idle: {
            imageSrc: "./img/kenji/Idle.png",
            framesMax: 4
        },
        run: {
            imageSrc: "./img/kenji/Run.png",
            framesMax: 8

        },
        jump: {
            imageSrc: "./img/kenji/Jump.png",
            framesMax: 2

        },
        fall: {
            imageSrc: "./img/kenji/Fall.png",
            framesMax: 2
        },
        attack1: {
            imageSrc: "./img/kenji/Attack1.png",
            framesMax: 4
        },
        takeHit: {
            imageSrc: "./img/kenji/Take hit.png",
            framesMax: 3
        },
        death: {
            imageSrc: "./img/kenji/Death.png",
            framesMax: 7
        }
    },
    attackBox: {
        offset: {
            x: -170,
            y: 50
        },
        width: 170,
        height: 50
    }
});


const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}


function rectangularCollision({ recangle1, rectangle2  }) {
    return (
        recangle1.attackBox.position.x + recangle1.attackBox.width >= rectangle2.position.x
        && recangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        recangle1.attackBox.position.y + recangle1.attackBox.height >= recangle1.position.y &&
        recangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

decreseTimer()


function animate() {
    window.requestAnimationFrame(animate);
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    backGround.update();
    shop.update();
    ctx.fillStyle = "rgba(255,255,255,0.15)"
    ctx.fillRect(0,0,canvas.width,canvas.height)
    player.update();
    enemy.update();
    player.velocity.x = 0;
    enemy.velocity.x = 0;

    //player movement
    if (keys.a.pressed && player.lastKey === "a") {
        player.velocity.x = -5;
        player.switchsprite("run");
    } else if (keys.d.pressed && player.lastKey === "d") {
        player.switchsprite("run");
        player.velocity.x = 5;
    } else {
        player.switchsprite("idle")

    }
    //jumping
    if (player.velocity.y < 0) {
        player.switchsprite("jump")
    } else if (player.velocity.y > 0) {
        player.switchsprite("fall")


    }
    //enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
        enemy.velocity.x = -5;
        enemy.switchsprite("run");

    } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
        enemy.velocity.x = 5;
        enemy.switchsprite("run");

    } else {
        enemy.switchsprite("idle");

    }
    //jumping
    if (enemy.velocity.y < 0) {
        enemy.switchsprite("jump")
    } else if (enemy.velocity.y > 0) {
        enemy.switchsprite("fall")
    }
    // detect for colision enemy gets hit
    if (rectangularCollision({
        recangle1: player,
        rectangle2: enemy
    }) && player.isAtacking &&
        player.frameCurent === 4) {
        enemy.takeHit()
        player.isAtacking = false;
        // document.querySelector("#enemyHealth").style.width = enemy.health + "%";
        gsap.to("#enemyHealth",{
            width:enemy.health + "%"
        })
        console.log("boom");
    }
    // if (
    //     rectangularCollision({
    //         rectangle1: player,
    //         rectangle2: enemy
    //     }) &&
    //     player.isAttacking &&
    //     player.framesCurrent === 4
    // ) {
    //     enemy.takeHit()
    //     player.isAttacking = false
    //     document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    // }
    //// if player mises
    if (player.isAtacking && player.frameCurent === 4) {
        player.isAtacking = false;
    }
    //detect for colision player gets hit
    if (rectangularCollision({
        recangle1: enemy,
        rectangle2: player
    }) && enemy.isAtacking && enemy.frameCurent === 2) {

        player.takeHit()
        enemy.isAtacking = false;
        // document.querySelector("#playerHealth").style.width = player.health + "%";
        gsap.to("#playerHealth",{
            width:player.health + "%"
        })
        console.log("boom player 2");
    }
    //// if player mises
    if (enemy.isAtacking && enemy.frameCurent === 2) {
        enemy.isAtacking = false;
    }

    //end game based on health
    if (enemy.health <= 0 || player.health <= 0) {
        determinateWinner({ player, enemy, timerId })

    }
}


animate();

window.addEventListener("keydown", (event) => {
    if(!player.dead){
        switch (event.key) {
            //player 1
            case "d":
                keys.d.pressed = true;
                player.lastKey = "d"
                break;
            case "a":
                keys.a.pressed = true;
                player.lastKey = "a"
                break;
            case "w":
                player.velocity.y = -20;
                break;
            case " ":
                player.atack();
                break;
        }

    }
    if(!enemy.dead){
        switch(event.key){
            //player 2
            case "ArrowRight":
                keys.ArrowRight.pressed = true;
                enemy.lastKey = "ArrowRight"
                break;
            case "ArrowLeft":
                keys.ArrowLeft.pressed = true;
                enemy.lastKey = "ArrowLeft"
                break;
            case "ArrowUp":
                enemy.velocity.y = -20;
                break;
            case "ArrowDown":
                enemy.atack()
                break;
        }

    }

    

    console.log(event.key)

})
window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "d":
            keys.d.pressed = false;

            break;
        case "a":
            keys.a.pressed = false;

            break;
        case "w":
            keys.w.pressed = false;

            break;
        case "ArrowRight":
            keys.ArrowRight.pressed = false;

            break;
        case "ArrowLeft":
            keys.ArrowLeft.pressed = false;

            break;
        case "ArrowUp":
            keys.ArrowUp.pressed = false;

            break;
    }
    console.log(event.key)

})