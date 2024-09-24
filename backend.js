//BACKEND--BACKEND--BACKEND--BACKEND--BACKEND--BACKEND

//server response to client
function serverPostToClient(clientmove) {
    //after getting told the legal moves by the server we play them on our local board
    board[clientmove[1][0]][clientmove[1][1]] = board[clientmove[0][0]][clientmove[0][1]]
    board[clientmove[0][0]][clientmove[0][1]] = 0
    moveCount += 1;
}

//clientmove = CurrentMove
//server calculates if move suggested by the frontend is possible
function ServerCalc(clientmove) {
    // Array where pieces are listed by their position [x][y], 0=nothing, 1=pawn, 2=knight, 3=bishop, 5=rook, 9=queen, 10=king
    const board = [];
    for (let x = 0; x < boardsize; x++) {
        const xy = [];
        for (let y = 0; y < boardsize; y++) {
            xy[y] = 0;
        }
        board[x] = xy;
    }



    if (color == "w") {
        WhitePiecesCalculationMoves(clientmove, board);

    } else {
        BlackPiecesCalculationMoves(clientmove, board);
    }

}