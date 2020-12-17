README.md
GAME | IronWars Pang! 
Introduction
The goal of this project is to create a web-based video game inspired in the famous arcade game Buster Bros (Super Pang! in Spain).
The main goal is to create a logic following the same as the Buster Bros and run it on  any web browser. The ultimate goal is to create a new design based on Star Wars as well as to be able to play it using a gamepad. 
The goal of the game is to blow up all the balls and clear the game ground from floating balls in the least amount of time. The quicker the balls are cleared, the higher the score. If the counter gets to 0 and there are still balls floating around, the game is over and the player cannot continue to the next level.

To reach the goals the game logic as well as the (optional) design are going to be based on canvas.

Iterations
Iteration 1: Drawing the main character

The first step is to create a square using canvas that will represent the main character. This square will be changed by the actual design in further iterations.
The character must move from left to right along the whole canvas width and at the bottom of the game square. 
We need to create the canvas and display the game ground.
Bonus: Choosing a character
The player can choose his favorite character among several options to play the game. The weapon and the sounds of the player must be updated according to the character.

Iteration 2: Creating the bullets
In our game, the player will be able to shoot bullets from a weapon which will impact on the balls and will split them upon collision. 
The bullets will be able to move along the vertical axis from the moment the gun is shot and they will become an independent object. A bullet speed must be set and the bullets will have a constant x position that will be set as the same as the position of the player when the gun was shot.
Bonus: Adding a lightsaber
If the character uses a lightsaber in Star Wars movies it can be added to the character and it can be used to blow up balls when they are next to the character.

Iteration 3: Creating the main ball
Once we have our main character and the bullets, we need to create the main ball, which will be split into smaller balls in next iterations. The ball must have a similar gravity to the one on Buster Brothers and must be able to float around the canvas square like so.

Iteration 4: Splitting the ball into smaller balls
Iteration 4.1: Splitting the main ball into smaller balls
Once the main ball is hit by a bullet it is splitted into two balls whose radius is half the radius of the main ball. These new balls will follow the same logic as the main ball floating around the canvas. Their gravity must be updated according to their size.
Iteration 4.2: Splitting the secondary balls into smaller balls
Once any of the two secondary balls is hit by a bullet it is splitted into two balls whose radius is half the radius of that secondary ball. These new balls will follow the same logic as their parent ball floating around the canvas. Their gravity must be updated according to their size.
Iteration 4.3: Splitting grandchildren and beyond
The same logic of the previous two points must be followed until 5th generation balls are floating around the canvas. 
The moment the 5th generation ball, which is the smallest possible, is hit by a bullet the ball disappears from the game.

Iteration 5: Adding the countdown
The original Buster Bros game has a countdown. If the countdown reaches 0 and there are balls floating around the canvas the game is over.
The goal of this iteration is to create a countdown as well as the logic to trigger when the game is over.

Iteration 6: Points
If we want to challenge somebody, we need to quantify who is making it better. So we need to add a score. The goal of this iteration is to add 50 points every time a ball is hit. 100 points every time a 5th generation ball is cleared from the canvas and 100 points for every block of 25 seconds remaining on the counter.

Bonus 1 - Iteration 7: Setting the theme and sounds
The game is going to be designed around a Star Wars theme. The background must be set to a Star Wars scenario. 
The music theme is going to be the sable lightsaber fight of Star Wars Episode I: The phantom menace. The music theme before the game starts is going to be the main Star Wars theme. If the game is over the theme is going to be Imperial March and if the game is won by the player, some happy ending Star Wars theme.
The gun must fire laser red bullets and the sound produced by the laser gun must be the same as the one on Star Wars movies.
The ball must be an Ironhack hexagon which is split into smaller hexagons.

Bonus 2 - Iteration 8: Using a game controller
The player should be able to play the game using any gamepad linked to the computer. The gamepad can be added to the code through the Gamepad API.

Superbonus - Iteration 9: Adding a second player
A second player can be added to the gameplay to help the main character to clear the canvas from floating balls. The second player must be an ally of the main character in Star Wars films.
The difficulty of the game must be increased whenever there are two players playing the game.
Superbonus 9.1: Enemies fight against each other
Whenever the characters chosen by player 1 and player 2 are enemies on Star Wars they must fight against each other. To win the game, the player must clear the map from floating balls and defeat the enemy.

