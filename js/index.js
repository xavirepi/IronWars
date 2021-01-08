const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// window.addEventListener("gamepadconnected", function(e) {
//   console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
//     e.gamepad.index, e.gamepad.id,
//     e.gamepad.buttons.length, e.gamepad.axes.length);
// });

// window.addEventListener("gamepaddisconnected", function(e) {
//   console.log("Gamepad disconnected from index %d: %s",
//     e.gamepad.index, e.gamepad.id);
// });

window.onload = () => {

  document.getElementById('start-game').onclick = () => {

    buttonClick.play();

    setTimeout(() => {
      document.getElementById('start-game').classList.add("hidden");

      document.getElementById('myVideo').classList.remove("hidden");
      document.getElementById('myVideo').play();

      document.getElementById('skip-intro').classList.remove("hidden");
      document.getElementById('single-player').classList.remove("hidden");
      document.getElementById('multi-player').classList.remove("hidden");

      // VIDEO FINISHED || SKIP-INTRO:
      document.addEventListener('keypress', () => {
        document.getElementById('myVideo').pause();
        document.getElementById('myVideo').classList.add("hidden");
        document.getElementById('skip-intro').classList.add("hidden");

        document.getElementById("help").classList.remove("hidden");

        menuTheme.play();
      })

      document.getElementById('myVideo').onended = () => {
        document.getElementById('myVideo').classList.add("hidden");
        if (document.getElementById('myVideo').classList.add("hidden")) {
          document.getElementById('skip-intro').classList.add("hidden");
        }
        document.getElementById("help").classList.remove("hidden");

        menuTheme.play();
      }
    }, 1000)
  };

  // SINGLE PLAYER
  document.getElementById('single-player').onclick = () => {
    buttonClick.play();

    setTimeout(() => {
      document.getElementById('single-player').classList.add("hidden");
      document.getElementById('multi-player').classList.add("hidden");

      document.getElementById('light-side').classList.remove("hidden");
      document.getElementById('dark-side').classList.remove("hidden");
      document.getElementById("back").classList.remove("hidden");
    }, 300)
  };

  // Player 1
  document.getElementById('light-side').onclick = () => {
    ligthsaberClick.play();
    menuTheme.pause();
    menuTheme.currentTime = 0;
    setTimeout(() => {
      theme.play();
      document.getElementById('game-ground').classList.remove("hidden");
      document.getElementById('start-playing').classList.remove("hidden");

      document.getElementById('light-side').classList.add("hidden");
      document.getElementById('dark-side').classList.add("hidden");

      document.addEventListener('keypress', () => {
        menuTheme.pause();
        menuTheme.currentTime = 0;
        document.getElementById("game-intro").classList.add("hidden");
        document.getElementById('start-playing').classList.add("hidden");

        document.getElementById("pause-game").classList.remove("hidden");
        document.getElementById("help").classList.add("hidden");
        document.getElementById("back").classList.add("hidden");
        let game = new Game(ctx, Player, null);
        game.start();
        document.getElementById("pause-game").classList.remove("hidden");
      })
    }, 500)
  };

  // Player 2
  document.getElementById('dark-side').onclick = () => {
    ligthsaberClick.play();
    menuTheme.pause();
    menuTheme.currentTime = 0;
    setTimeout(() => {
      darkSideTheme.play();
      document.getElementById('game-ground').classList.remove("hidden");
      document.getElementById('start-playing').classList.remove("hidden");

      document.getElementById('light-side').classList.add("hidden");
      document.getElementById('dark-side').classList.add("hidden");
      document.getElementById("back").classList.remove("hidden");

      document.addEventListener('keypress', () => {
        theme.pause();
        theme.currentTime = 0;
        menuTheme.pause();
        menuTheme.currentTime = 0;
        document.getElementById("game-intro").classList.add("hidden");
        document.getElementById('start-playing').classList.add("hidden");

        document.getElementById("help").classList.add("hidden");
        document.getElementById("back").classList.add("hidden");
        game = new Game2(ctx, null, Player2);
        game.start();
        document.getElementById("pause-game").classList.remove("hidden");
      })
    }, 500)
  };

  // 2 PLAYERS
  document.getElementById('multi-player').onclick = () => {
    buttonClick.play();
    menuTheme.pause();
    menuTheme.currentTime = 0;
    setTimeout(() => {
      theme.play();
      theme.volume = 0.4
      document.getElementById('single-player').classList.add("hidden");
      document.getElementById('multi-player').classList.add("hidden");
      document.getElementById('game-ground').classList.remove("hidden");
      document.getElementById('start-playing').classList.remove("hidden");
      document.getElementById("back").classList.remove("hidden");

      document.addEventListener('keypress', () => {
        menuTheme.pause();
        menuTheme.currentTime = 0;
        document.getElementById("game-intro").classList.add("hidden");
        document.getElementById('start-playing').classList.add("hidden");

        document.getElementById("help").classList.add("hidden");
        document.getElementById("back").classList.add("hidden");

        game = new MultiPlayerGame(ctx, Player, Player2);
        game.start();
        document.getElementById("pause-game").classList.remove("hidden");
      })
    }, 300)

  };
};


// TOP MENU

// BACK
// document.getElementById('back').onclick = () => {

// let arr = [...document.body.getElementsByClassName('hidden')]
// arr.forEach(element => {
//   if (!element.classList.contains('hidden')) {
//     element.classList.remove('hidden');
//   }
//   console.log(element)
// });

//   setTimeout(() => {
//     document.getElementById('single-player').classList.remove("hidden");
//     document.getElementById('multi-player').classList.remove("hidden");
//   }, 10)

// document.addEventListener('keypress', () => {
//   document.getElementById("game-intro").classList.add("hidden");
//   document.getElementById('start-playing').classList.add("hidden");

//   document.getElementById("help").classList.add("hidden");
//   document.getElementById("back").classList.add("hidden");
//   game = new Game2(ctx, null, Player2);
//   game.start();
//   document.getElementById("pause-game").classList.remove("hidden");
// })
// };

// HELP
document.getElementById('help').onclick = () => {
  buttonClick.play();

  setTimeout(() => {
    document.getElementById('help-info').classList.remove("hidden");
    document.getElementById('help-info').onclick = () => {
      buttonClick.play();

      setTimeout(() => {
        document.getElementById('help-info').classList.add("hidden");
      }, 300)

    }

    document.addEventListener('keypress', () => {
      document.getElementById('help-info').classList.add("hidden");
    })
  }, 300)

};

// MAIN MENU
document.getElementById('exit-game').onclick = () => {
  buttonClick.play();

  setTimeout(() => {
    document.getElementById('exit-game-alert').classList.remove("hidden");
    document.getElementById('exit').onclick = () => {
      setTimeout(() => {
        location.reload();
      }, 300)
    }

    document.getElementById('exit-game-alert').onclick = () => {
      buttonClick.play();

      document.getElementById('exit-game-alert').classList.add("hidden");

    }
  }, 300)

  document.addEventListener('keypress', () => {
    document.getElementById('exit-game-alert').classList.add("hidden");
  })
};