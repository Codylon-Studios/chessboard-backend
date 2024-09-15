//BACKEND--BACKEND--BACKEND--BACKEND--BACKEND--BACKEND

//server response to client
function serverPostToClient(clmove) {
    //after getting told the legal moves by the server we play them on our local board
    board[clmove[1][0]][clmove[1][1]] = board[clmove[0][0]][clmove[0][1]]
    board[clmove[0][0]][clmove[0][1]] = 0
    moveCount += 1;
    gmupdt()
}

//clmove = CurrentMove
//server calculates if move suggested by the frontend is possible
function ServerCalc(clmove) {
    var move = clmove;
    var backendboard = board;


    if (color == "w") {
        WhitePiecesCalculationMoves(move[0][0], move[0][1], move[1][0], move[1][1], backendboard, clmove);

    } else {
        BlackPiecesCalculationMoves(move[0][0], move[0][1], move[1][0], move[1][1], backendboard, clmove);
    }

}