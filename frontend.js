//FRONTEND--FRONTEND--FRONTEND--FRONTEND--FRONTEND--FRONTEND

const boardsize = 8;

// Defines the color the player plays
var color = "w";

// Move count
var moveCount = 1;

// currentMove has the structure: currentMove[[mx_old, my_old], [mx_new, my_new], 0 or 1]
// 0 means old and new coordinates are submitted
// 1 means coordinates are still pending
let currentMove = [];

// Create an 8x8 chessboard
function createChessboard() {
  const chessboard = document.getElementById('chessboard');
  
  for (let row = 0; row < boardsize; row++) {
    for (let col = 0; col < boardsize; col++) {
      const square = document.createElement('div');
      square.classList.add('square');
      
      if ((row + col) % 2 === 0) {
        square.classList.add('white');
      } else {
        square.classList.add('black');
      }

      square.addEventListener('click', () => onSquareClick(row, col));

      chessboard.appendChild(square);
    }
  }
}

// Handle square click
function onSquareClick(row, col) {
  console.log("Color: "+ color);
  console.log("Current Move:"+ moveCount);
  console.log(`Clicked square at row ${row}, column ${col}`);
  
  if (currentMove.length === 0) {
    // If no move started, store initial click as the starting point
    currentMove[0] = [row, col];
    console.log("Start of move at:", currentMove[0][0], currentMove[0][1]);
  } else if (currentMove.length === 1) {
    // If first coordinate already stored, store the second click
    currentMove[1] = [row, col];
    console.log("End of move at:", currentMove[1][0], currentMove[1][1]);
    ServerCalc(currentMove);
    //Reset currentMove for the next move
    currentMove = [];
  }
}

createChessboard();
