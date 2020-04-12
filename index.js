// Task: [] Generate the Game Map

/* Steps */
/* [x] create a Game Framework skeleton to expose public APIS
   [x] The framework should hold methods that starts the game and keeps the game running;
   [x] A function that calls the game after all elements have been loading
   [] Draw the board map
   [] Make box empty or dimmed
   [] Place weapons randomly on the board
   [] Place two players randomly on the board
 */

window.onload = function init() {
  const game = new GF();
  // game.start();
}

let GF = function() {
  // Global variables
  let canvas, ctx, GAME_WIDTH, GAME_HEIGHT;
  
  const boardData = [
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    [1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
  ];

  // drawing the board
  function gameBoard() {

  }

  // clear context
  function clearCanvas() {
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  }

  // a function to keep the game running
  function mainLoop() {
    clearCanvas();

    document.body.innerHTML += '*'; 
    requestAnimationFrame(mainLoop);
  }

  // a function to start the game
  function start () {
    canvas = document.querySelector('#gameCanvas');
    GAME_WIDTH = canvas.width;
    GAME_HEIGHT = canvas.height;

    // 2d context
    ctx = canvas.getContext('2d');

    requestAnimationFrame(mainLoop())
  }

  // returns methods that is public and can be accessed by any element.
  return {
    start: start
  }
}


