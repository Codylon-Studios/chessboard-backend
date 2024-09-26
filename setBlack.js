/*
    move[0][0] is the x coordinate of the first click = initialx
    move[0][1] is the y coordinate of the first click = initialy
    move[1][0] is the x coordinate of the second click = finalx
    move[1][1] is the y coordinate of the second click = finaly
*/

function BlackPiecesCalculationMoves(clientmove, backendboard) {
    console.log(clientmove[0][0]);
    initialx = clientmove[0][0];
    initialy = clientmove[0][1];
    finalx = clientmove[1][0];
    finaly = clientmove[1][1];
    switch (backendboard[initialx][initialy]) {
        case -1: //pawn
            //checking if two coordinates have the same x-coordinate
            if (initialx == finalx) {
                //checks if piece y coordinate was changed
                if (initialy == finaly) {
                    console.log("piece can't move to same position as before")
                    return 1;
                } else
                    //this one checks how many moves to the front the pawn makes
                    //if one move is made -> move
                    //if two moves are made and pawn is on second rank -> move
                    if (initialy - 1 == finaly || (initialy == 6 && initialy - 2 == finaly)) {
                        //now we change the board data in the backend and the frontend
                        serverPostToClient(clientmove);
                        return 0;
                    }
            }
            break;

        case -2: //knight
            if (((initialx == finalx - 1 || initialx == finalx + 1) && (initialy == finaly + 2 || initialy == finaly - 2)) || ((initialx == finalx - 2 || initialx == finalx + 2) && (initialy == finaly + 1 || initialy == finaly - 1))) {
                //if the programm comes this far, it means that the move is possible so we play it
                //check if piece moves to the same position as before
                if (initialx == finalx && initialy == finaly) {
                    console.log("piece can't move to same position as before");
                    return 1;
                } else {
                    serverPostToClient(clientmove);
                    return 0;
                }
            }
            break;

        case -3: //bishop
            if (Math.abs((initialx - finalx)) == Math.abs((initialy - finaly))) {
                if (initialx == finalx && initialy == finaly) {
                    console.log("piece can't move to same position as before")
                    return 1;
                } else {
                    serverPostToClient(clientmove);
                    return 0;
                }
            }
            break;

        case -9: //queen
            if (Math.abs((initialx - finalx)) == Math.abs((initialy - finaly)) || (initialx == finalx) || (initialy == finaly)) {
                if (initialx == finalx && initialy == finaly) {
                    console.log("piece can't move to same position as before")
                    return 1;
                } else {
                    serverPostToClient(clientmove)
                    return 0;
                }
            }
            break;

        case -10: //king
            if (Math.abs((initialx - finalx)) <= 1 && Math.abs((initialy - finaly)) <= 1) {
                if (initialx == finalx && initialy == finaly) {
                    console.log("piece can't move to same position as before")
                    return 1;
                } else {
                    serverPostToClient(clientmove)
                    return 0;
                }
            }
            break;

        case -5://rook
            //check if clicked fields are same (in this case we terminate the backend process)
            if (initialx == finalx && initialy == finaly) {
                console.log("piece can't move to same position as before");
                return 1;
            } else {
                //check if can acually go on the field
                if (initialx == finalx || initialy == finaly) {
                    //check if any piece is on the way
                    if (initialx == finalx) {
                        for (let x = Math.min(initialy, finaly) + 1; x < Math.max(initialy, finaly); x++) {
                            if (backendboard[initialx][x] != 0) {
                                console.log("piece in the way");
                                return 2;
                            }
                        }
                    }
                    if (initialy == finaly) {
                        for (let x = Math.min(initialx, finalx) + 1; x < Math.max(initialx, finalx); x++) {
                            if (backendboard[x][initialy] != 0) {
                                console.log("piece in the way");
                                return 2;
                            }
                        }
                    }
                    serverPostToClient(clientmove);
                    return 0;
                }
            }
            break;
    }

}
