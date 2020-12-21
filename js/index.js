const canvas = document.getElementById('canvas')

const ctx = canvas.getContext('2d')

const game = new Game(ctx);

// window.addEventListener("gamepadconnected", function(e) {
//   console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
//     e.gamepad.index, e.gamepad.id,
//     e.gamepad.buttons.length, e.gamepad.axes.length);
//     game.start();
// });

// window.addEventListener("gamepaddisconnected", function(e) {
//   console.log("Gamepad disconnected from index %d: %s",
//     e.gamepad.index, e.gamepad.id);
// });

window.onload = () => {
  // document.getElementById('start-button').onclick = () => {
  //   startGame();
  // };

  // function startGame() {
  //   game.start();
  
  document.addEventListener('keypress', () => {
    document.getElementsByClassName("game-intro")[0].innerHTML = ""; 
    game.start();
  })
};