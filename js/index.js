const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

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
  // SINGLE PLAYER
  document.getElementById('single-player').onclick = () => {
    document.getElementById('single-player').classList.toggle("hidden");
    document.getElementById('multi-player').classList.toggle("hidden");
    document.getElementById('light-side').classList.toggle("hidden");
    document.getElementById('dark-side').classList.toggle("hidden");
  };

  // Player 1
  document.getElementById('light-side').onclick = () => {
    document.getElementById('light-side').classList.toggle("hidden");
    document.getElementById('dark-side').classList.toggle("hidden");
    document.getElementById('game-ground').classList.toggle("hidden");
    document.getElementById('press-key').classList.toggle("hidden");

    document.addEventListener('keypress', () => {
      document.getElementsByClassName("game-intro")[0].innerHTML = "";
      let game = new Game (ctx, Player, null);
      game.start();
    })
  };

  // Player 2
  document.getElementById('dark-side').onclick = () => {
    document.getElementById('light-side').classList.toggle("hidden");
    document.getElementById('dark-side').classList.toggle("hidden");
    document.getElementById('game-ground').classList.toggle("hidden");

    document.getElementById('press-key').classList.toggle("hidden");
    document.addEventListener('keypress', () => {
      document.getElementsByClassName("game-intro")[0].innerHTML = "";
      game = new Game2 (ctx, null, Player2);
      game.start();
    })
  };

  // 2 PLAYERS
  document.getElementById('multi-player').onclick = () => {
    document.getElementById('single-player').classList.toggle("hidden");
    document.getElementById('multi-player').classList.toggle("hidden");
    document.getElementById('game-ground').classList.toggle("hidden");

    document.getElementById('press-key').classList.toggle("hidden");
    document.addEventListener('keypress', () => {
      document.getElementsByClassName("game-intro")[0].innerHTML = ""; 
      game = new MultiPlayerGame (ctx, Player, Player2);
      game.start();
    })
  };
};