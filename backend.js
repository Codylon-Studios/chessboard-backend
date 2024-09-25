//BACKEND--BACKEND--BACKEND--BACKEND--BACKEND--BACKEND

    // Array where pieces are listed by their position [x][y], 0=nothing, 1=pawn, 2=knight, 3=bishop, 5=rook, 9=queen, 10=king
    const board = [
        [5, 2, 3, 9, 10, 3, 2, 5],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [5, 2, 3, 9, 10, 3, 2, 5],
    ];

//server response to client
function serverPostToClient(clientmove) {
    const fromSquare = document.getElementById(`square-${clientmove[0][0]}-${clientmove[0][1]}`);
    const toSquare = document.getElementById(`square-${clientmove[1][0]}-${clientmove[1][1]}`);

    const pieceImage = fromSquare.querySelector('img');
    if (pieceImage) {
        fromSquare.removeChild(pieceImage); // Remove from the original square
        toSquare.appendChild(pieceImage);   // Append to the destination square
    }

    moveCount += 1;
}



//clientmove = CurrentMove
//server calculates if move suggested by the frontend is possible
function ServerCalc(clientmove) {

    if (color == "w") {
        var result = WhitePiecesCalculationMoves(clientmove, board);
        //0 means the move succcessdd
        if (result == 0){
            board[clientmove[1][0]][clientmove[1][1]] = board[clientmove[0][0]][clientmove[0][1]]
            board[clientmove[0][0]][clientmove[0][1]] = 0
            console.log("hey it worked")
        } else {
            console.log("invalid move");
        }

    } else {
        BlackPiecesCalculationMoves(clientmove, board);
    }

}