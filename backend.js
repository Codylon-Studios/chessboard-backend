//BACKEND--BACKEND--BACKEND--BACKEND--BACKEND--BACKEND

//server response to client
function serverPostToClient(clmove) {
    //after getting told the legal moves by the server we play them on our local board
    board[clmove[1][0]][clmove[1][1]] = board[clmove[0][0]][clmove[0][1]]
    board[clmove[0][0]][clmove[0][1]] = 0
    gmupdt()
}

//clmove = CurrentMove
//server calculates if move suggested by the frontend is possible
function ServerCalc(clmove) {
    const move = clmove
    //lets say the board is saved on the server from the view of white
    //that means if we play black we have to "flip our move by 180"
    if (color == "b") {
        //now were basically subtracting the coordinates of the fields from 7 flipping them around the center of the board
        for (let x = 0; a < 1; a++) {
            for (let y = 0; y < 1; y++) {
                move[x][y] = 7 - move[x][y]
            }
        }
    }
    //now we have to check whether the move is possible
    //so first we figure out what kind of piece needs to be moved
    /*
        move[0][0] is the x coordinate of the first click
        move[0][1] is the y coordinate of the first click
        move[1][0] is the x coordinate of the second click
        move[1][1] is the y coordinate of the second click
    */

    switch (board[move[0][0]][move[0][1]]){
        case 1: //pawn
        //checking if two coordinates have the same x-coordinate
        if (move[0][0] == move[1][0]) {
            //checks if piece y coordinate was changed
            if (move[0][1] == move [1][1]){
                console.log("piece can't move to same position as before")
                return;
            }else
            //this one checks how many moves to the front the pawn makes
            //if one move is made -> move
            //if two moves are made and pawn is on second rank -> move
            if (move[0][1] - 1 == move[1][1] || (move[0][1] == 6 && move[0][1] - 2 == move[1][1])) {
                //now we change the board data in the backend and the frontend
                serverPostToClient(clmove);
                board[move[0][0]][move[0][1]] = 0
                board[move[1][0]][move[1][1]] = 1
            }
        }
        break;

        case 2: //knight
        if (((move[0][0] == move[1][0] - 1 || move[0][0] == move[1][0] + 1) && (move[0][1] == move[1][1] + 2 || move[0][1] == move[1][1] - 2)) || ((move[0][0] == move[1][0] - 2 || move[0][0] == move[1][0] + 2) && (move[0][1] == move[1][1] + 1 || move[0][1] == move[1][1] - 1))) {
            //if the programm comes this far, it means that the move is possible so we play it
            //check if frontend gives the same fields
            if (move[0][0] == move[1][0] && move[0][1] == move[1][1]) {
                console.log("piece can't move to same position as before")
                return;
            } else {
                serverPostToClient(clmove)
                board[move[0][0]][move[0][1]] = 0
                board[move[1][0]][move[1][1]] = 2
            }
        }
        break;

        case 3: //bishop
            if (Math.abs((move[0][0] - move[1][0])) == Math.abs((move[0][1] - move[1][1]))) {
                if (move[0][0] == move[1][0] && move[0][1] == move[1][1]) {
                    console.log("piece can't move to same position as before")
                    return;
                } else {
                    serverPostToClient(clmove)
                    board[move[0][0]][move[0][1]] = 0
                    board[move[1][0]][move[1][1]] = 3
                }
            }
        break;

        case 9: //queen
        if (Math.abs((move[0][0] - move[1][0])) == Math.abs((move[0][1] - move[1][1])) || (move[0][0] == move[1][0]) || (move[0][1] == move[1][1])) {
            if (move[0][0] == move[1][0] && move[0][1] == move[1][1]) {
                console.log("piece can't move to same position as before")
                return;
            } else {
                serverPostToClient(clmove)
                board[move[0][0]][move[0][1]] = 0
                board[move[1][0]][move[1][1]] = 9
            }
        }
        break;

        case 10: //king
        if (Math.abs((move[0][0] - move[1][0])) <= 1 && Math.abs((move[0][1] - move[1][1])) <= 1) {
            if (move[0][0] == move[1][0] && move[0][1] == move[1][1]) {
                console.log("piece can't move to same position as before")
                return;
            } else {
                serverPostToClient(clmove)
                board[move[0][0]][move[0][1]] = 0
                board[move[1][0]][move[1][1]] = 10
            }
        }
        break;

        case 5://rook
            //check if clicked fields are same (in this case we terminate the backend process)
        if (move[0][0] == move[1][0] && move[0][1] == move[1][1]) {
            console.log("piece can't move to same position as before")
            return;
        } else {
            //check if can acually go on the field
            if (move[0][0] == move[1][0] || move[0][1] == move[1][1]) {
                //check if any piece is on the way
                if (move[0][0] == move[1][0]) {
                    for (let x = Math.min(move[0][1], move[1][1]) + 1; x < Math.max(move[0][1], move[1][1]); x++) {
                        if (board[move[0][0]][x] != 0) {
                            console.log("piece in the way")
                            return;
                        }
                    }
                }
                if (move[0][1] == move[1][1]) {
                    for (let x = Math.min(move[0][0], move[1][0]) + 1; x < Math.max(move[0][0], move[1][0]); x++) {
                        if (board[x][move[0][1]] != 0) {
                            console.log("piece in the way")
                            return;
                        }
                    }
                }
                serverPostToClient(clmove)
                board[move[0][0]][move[0][1]] = 0
                board[move[1][0]][move[1][1]] = 5
            }
        }
        break;
    }
}