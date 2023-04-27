function determinateWinner({ enemy, player, timerId }) {
    clearTimeout(timerId)
    document.querySelector("#displayText").style.display = "flex"
    if (player.health == enemy.health) {
        document.querySelector("#displayText").innerHTML = "tie";
    } else if (player.health > enemy.health) {
        document.querySelector("#displayText").innerHTML = "player 1 wins!";
    } else if (player.health < enemy.health) {
        document.querySelector("#displayText").innerHTML = "player 2 wins!";

    }

}
let timer = 60;
let timerId
function decreseTimer() {


    if (timer > 0) {
        timerId = setTimeout(decreseTimer, 1000)
        timer--;
        document.querySelector("#timer").innerHTML = timer
    }
}


// function rectangularCollision({ rectangle1, rectangle2 }) {
//     return (
//       rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
//         rectangle2.position.x &&
//       rectangle1.attackBox.position.x <=
//         rectangle2.position.x + rectangle2.width &&
//       rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
//         rectangle2.position.y &&
//       rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
//     )
//   }
