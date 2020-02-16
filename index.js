/* Step1: Generating a Map 
  
  * Objectives:
  1. Randomly generate each map.
  2. Create different types of weapons up to four(4).
  3. Each weapon should have a name and associated visual.
  4. Default weapon should carry 10 points for each player.
  5. Number of players in a game should be two.
  6. Players must be placed randomly on the map when the game loads
  6. Players cannot be together.

*/

// weapons
const weapons = [
  { name: "potatoes", image: "", default: false, points: 20 },
  { name: "tomatoes", image: "", default: true, points: 10 },
  { name: "garden-eggs", image: "", default: false, points: 15 },
  { name: "pepper", image: "", default: false, points: 10 }
];

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const ROW = 15;
const COL = 15;
const VACANT = "WHITE";
const SQ = 40;

function drawSquare(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect = (x * SQ, y * SQ, SQ, SQ);
  ctx.strokeStyle = "black";
  ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

// create board
let board = [];
for (let r = 0; r < ROW; r++) {
  board[r] = [];

  for (let c = 0; c < COL; c++) {
    board[r][c] = "VACANT";
  }
}

// Draw board
function drawBoard() {
  for (let r = 0; r < ROW; r++) {
    for (let c = 0; c < COL; c++) {
      drawSquare(c, r, board[r][c]);
    }
  }
}

drawBoard();
