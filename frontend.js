//FRONTEND--FRONTEND--FRONTEND--FRONTEND--FRONTEND--FRONTEND
    //creating canvas
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    var boardsize = 8;
    //defines the color the player plays
    var color = "w"
    //setting canvas size
    c.width = 800;
    c.height = 800;
    //currentMove has the structure: currentMove[[mx_old, my_old], [mx_new, my_new], 0 or 1]
    const currentMove = [];
    //calculating the size of each field on the board in px
    var fieldsize = c.height / boardsize;

    function click() {
        //turns mouse coordinates into fields on board
        mx = (mx - mx % fieldsize) / fieldsize;
        my = (my - my % fieldsize) / fieldsize;
        //if a field was clicked
        //currentMove[2] != 0
        //set the clicked field as the second location in the list and submit the move
        if (currentMove[2] == 0) {
            currentMove[1] = [mx, my]
            ServerCalc(currentMove);
            //after submitting the move we set current Move back to 0, so you can play your next move
            currentMove[2] = 1
            //if no field was clicked before
            //clicked field is getting the first field, currentMove[2] is set to 1
            //next click the programm sets the next click as the second field
        } else {
            if (board[mx][my] != 0) {
                currentMove[0] = [mx, my]
                currentMove[2] = 0
            }
        }
    }

    //array where fields are listed [x][y],0=nothing, 1=pawn, 2=knight, 3=bishop,5=rook, 9=queen, 10=King
    const board = [];
    //generating an empty chessboard
    for (let x = 0; x < boardsize; x++) {
        const xy = []
        for (let y = 0; y < boardsize; y++) {
            xy[y] = 0;
        }
        board[x] = xy
    }
    
    //function that draws the field
    function gmupdt() {
        for (let x = 0; x < boardsize; x++) {
            for (let y = 0; y < boardsize; y++) {
                //makes normal fields black or white
                if ((x + y) % 2 != 0) {
                    ctx.fillStyle = "#AAAAAA";
                } else {
                    ctx.fillStyle = "#111111";
                }
                //pawn color
                if (board[x][y] == 1) {
                    ctx.fillStyle = "pink"
                }
                //knight color
                if (board[x][y] == 2) {
                    ctx.fillStyle = "green"
                }
                //bishops color
                if (board[x][y] == 3) {
                    ctx.fillStyle = "blue"
                }
                //rook color
                if (board[x][y] == 5) {
                    ctx.fillStyle = "red"
                }

                //queen color
                if (board[x][y] == 9) {
                    ctx.fillStyle = "purple"
                }

                //king color
                if (board[x][y] == 10) {
                    ctx.fillStyle = "yellow"
                }


                ctx.fillRect(fieldsize * x, fieldsize * y, fieldsize, fieldsize);

            }
        }
    }

    //1=pawn, 2=knight, 3=bishop,5=rook, 9=queen, 10=King
    board[1][7] = 9;
    board[5][7] = 5;
    board[2][6] = 10;
    board[3][6] = 1;
    board[5][0] = 2;
    board[6][1] = 3;

    gmupdt();
