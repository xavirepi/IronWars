// var gamepadInfo = document.getElementById("gamepad-info");
// var ball = document.getElementById("ball");
// var start;
// var a = 0;
// var b = 0;

// var rAF = window.mozRequestAnimationFrame ||
//   window.webkitRequestAnimationFrame ||
//   window.requestAnimationFrame;

// var rAFStop = window.mozCancelRequestAnimationFrame ||
//   window.webkitCancelRequestAnimationFrame ||
//   window.cancelRequestAnimationFrame;

// window.addEventListener("gamepadconnected", function() {
//   var gp = navigator.getGamepads()[0];
//   gamepadInfo.innerHTML = "Gamepad connected at index " + gp.index + ": " + gp.id + ". It has " + gp.buttons.length + " buttons and " + gp.axes.length + " axes.";

//   game.start();
// });

// window.addEventListener("gamepaddisconnected", function() {
//   gamepadInfo.innerHTML = "Waiting for gamepad.";

//   rAFStop(start);
// });

// if(!('GamepadEvent' in window)) {
//   // No gamepad events available, poll instead.
//   var interval = setInterval(pollGamepads, 500);
// }

// function pollGamepads() {
//   var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
//   for (var i = 0; i < gamepads.length; i++) {
//     var gp = gamepads[i];
//     if(gp) {
//       gamepadInfo.innerHTML = "Gamepad connected at index " + gp.index + ": " + gp.id + ". It has " + gp.buttons.length + " buttons and " + gp.axes.length + " axes.";
//       game.start();
//       clearInterval(interval);
//     }
//   }
// }

// function buttonPressed(b) {
//   if (typeof(b) == "object") {
//     return b.pressed;
//   }
//   return b == 1.0;
// }

// function gameLoop() {
//   var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
//   if (!gamepads)
//     return;

//   var gp = gamepads[0];
//   if (buttonPressed(gp.buttons[0])) {
//     b--;
//   } else if (buttonPressed(gp.buttons[2])) {
//     b++;
//   }
//   if(buttonPressed(gp.buttons[1])) {
//     a++;
//   } else if(buttonPressed(gp.buttons[3])) {
//     a--;
//   }

//   ball.style.left = a*2 + "px";
//   ball.style.top = b*2 + "px";

//   var start = rAF(gameLoop);
// };