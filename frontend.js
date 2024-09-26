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

function createChessboard() {
  const chessboard = document.getElementById('chessboard');
  
  const initialBoard = [
    [-5, -2, -3, -9, -10, -3, -2, -5], 
    [-1, -1, -1, -1, -1, -1, -1, -1],  
    [0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0],  
    [0, 0, 0, 0, 0, 0, 0, 0],  
    [0, 0, 0, 0, 0, 0, 0, 0],  
    [1, 1, 1, 1, 1, 1, 1, 1],   
    [5, 2, 3, 9, 10, 3, 2, 5],  
  ];
  
  for (let row = 0; row < boardsize; row++) {
    for (let col = 0; col < boardsize; col++) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.id = `square-${row}-${col}`;

      if ((row + col) % 2 === 0) {
        square.classList.add('white');
      } else {
        square.classList.add('black');
      }

      const piece = initialBoard[row][col];
      if (piece !== 0) {
        const img = document.createElement('img');
        img.src = getPieceImage(piece);
        img.classList.add('chess-piece');
        square.appendChild(img);
      }

      square.addEventListener('click', () => onSquareClick(row, col));

      chessboard.appendChild(square);
    }
  }
}


function getPieceImage(piece) {
  switch (piece) {
    case 1: return `/images/pieces/pawn_w.png`;
    case 2: return `/images/pieces/knight_w.png`;
    case 3: return `/images/pieces/bishop_w.png`;
    case 5: return `/images/pieces/rook_w.png`;
    case 9: return `/images/pieces/queen_w.png`;
    case 10: return `/images/pieces/king_w.png`;
    case -1: return `/images/pieces/pawn_b.png`;
    case -2: return `/images/pieces/knight_b.png`;
    case -3: return `/images/pieces/bishop_b.png`;
    case -5: return `/images/pieces/rook_b.png`;
    case -9: return `/images/pieces/queen_b.png`;
    case -10: return `/images/pieces/king_b.png`;
    default: return '';
  }
}


// Handle square click
function onSquareClick(row, col) {
  console.log("Color: "+ color);
  console.log("Current Move:"+ moveCount);
  
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
