let gamepadAPI = {
    controller: {},
    turbo: false,
    connect: function () {},
    disconnect: function () {},
    update: function () {},
    buttonPressed: function () {},
    buttons: [],
    buttonsCache: [],
    buttonsStatus: [],
    axesStatus: []
};

gamepadAPI.buttons = [
    'DPad-Up', 'DPad-Down', 'DPad-Left', 'DPad-Right',
    'Start', 'Back', 'Axis-Left', 'Axis-Right',
    'LB', 'RB', 'Power', 'A', 'B', 'X', 'Y',
];

gamepadAPI.connect = function (evt) {
    gamepadAPI.controller = evt.gamepad;
    gamepadAPI.turbo = true;
    console.log('Gamepad connected.', evt);
};

gamepadAPI.disconnect = function (evt) {
    gamepadAPI.turbo = false;
    delete gamepadAPI.controller;
    console.log('Gamepad disconnected.', evt);
};

gamepadAPI.update = function () {
    // clear the buttons cache
    gamepadAPI.buttonsCache = [];
    // move the buttons status from the previous frame to the cache
    for (var k = 0; k < gamepadAPI.buttonsStatus.length; k++) {
        gamepadAPI.buttonsCache[k] = gamepadAPI.buttonsStatus[k];
    }
    // clear the buttons status
    gamepadAPI.buttonsStatus = [];
    // get the gamepad object
    var c = gamepadAPI.controller || {};

    // loop through buttons and push the pressed ones to the array
    var pressed = [];
    if (c.buttons) {
        for (var b = 0, t = c.buttons.length; b < t; b++) {
            if (c.buttons[b].pressed) {
                pressed.push(gamepadAPI.buttons[b]);
            }
        }
    }
    // loop through axes and push their values to the array
    var axes = [];
    if (c.axes) {
        for (var a = 0, x = c.axes.length; a < x; a++) {
            axes.push(c.axes[a].toFixed(2));
        }
    }
    // assign received values
    gamepadAPI.axesStatus = axes;
    gamepadAPI.buttonsStatus = pressed;

    if (gamepadAPI.turbo) {
        if (gamepadAPI.buttonPressed('A', 'hold')) {
            console.log('button pressed');
        }
        if (gamepadAPI.buttonPressed('B')) {
            this.managePause();
        }
    }

    // return buttons for debugging purposes
    return pressed;
};

gamepadAPI.buttonPressed = function (button, hold) {
    var newPress = false;
    // loop through pressed buttons
    for (var i = 0, s = gamepadAPI.buttonsStatus.length; i < s; i++) {
        // if we found the button we're looking for...
        if (gamepadAPI.buttonsStatus[i] == button) {
            // set the boolean variable to true
            newPress = true;
            // if we want to check the single press
            if (!hold) {
                // loop through the cached states from the previous frame
                for (var j = 0, p = gamepadAPI.buttonsCache.length; j < p; j++) {
                    // if the button was already pressed, ignore new press
                    if (gamepadAPI.buttonsCache[j] == button) {
                        newPress = false;
                    }
                }
            }
        }
    }
    return newPress;
};


// GAMEPAD TEST

window.addEventListener("gamepadconnected", gamepadAPI.connect);
window.addEventListener("gamepaddisconnected", gamepadAPI.disconnect);

const gamepadDisplay = document.getElementById('gamepad-display');

function update() {
    const gamepads = navigator.getGamepads();
    if (gamepads[0]) {
        const gamepadState = {
            id: gamepads[0].id,
            axes: [
                gamepads[0].axes[0].toFixed(2), // Left and Right
                gamepads[0].axes[1].toFixed(2), // Up and down
                gamepads[0].axes[2].toFixed(2),
                gamepads[0].axes[3].toFixed(2)
            ],
            buttons: [
            { button_X: gamepads[0].buttons[0].pressed },
            { button_A: gamepads[0].buttons[1].pressed },
            { button_B: gamepads[0].buttons[2].pressed },
            { button_Y: gamepads[0].buttons[3].pressed },
            { button_L: gamepads[0].buttons[4].pressed },
            { button_0: gamepads[0].buttons[5].pressed }, // Not working on SNES controller
            { button_R: gamepads[0].buttons[6].pressed },
            { button_0: gamepads[0].buttons[7].pressed }, // Not working on SNES controller
            { button_select: gamepads[0].buttons[8].pressed },
            { button_start: gamepads[0].buttons[9].pressed }
            ]
        }
        gamepadDisplay.textContent = JSON.stringify(gamepadState, null, 2)
        // const BUTTON_X = gamepads[0].buttons[0];
        // console.log(BUTTON_X);
    }
    if (gamepads[1]) {
        const gamepadState = {
            id: gamepads[1].id,
            axes: [
                gamepads[1].axes[0].toFixed(2), // Left and Right
                gamepads[1].axes[1].toFixed(2), // Up and down
                gamepads[1].axes[2].toFixed(2),
                gamepads[1].axes[3].toFixed(2)
            ],
            buttons: [
            { button_X: gamepads[1].buttons[0].pressed },
            { button_A: gamepads[1].buttons[1].pressed },
            { button_B: gamepads[1].buttons[2].pressed },
            { button_Y: gamepads[1].buttons[3].pressed },
            { button_L: gamepads[1].buttons[4].pressed },
            { button_0: gamepads[1].buttons[5].pressed }, // Not working on SNES controller
            { button_R: gamepads[1].buttons[6].pressed },
            { button_0: gamepads[1].buttons[7].pressed }, // Not working on SNES controller
            { button_select: gamepads[1].buttons[8].pressed },
            { button_start: gamepads[1].buttons[9].pressed }
            ]
        }
        gamepadDisplay.textContent = JSON.stringify(gamepadState, null, 2)
    }
    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);