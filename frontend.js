//FRONTEND--FRONTEND--FRONTEND--FRONTEND--FRONTEND--FRONTEND
    //creating canvas
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    var boardsize = 8;
    //defines the color the player plays
    var color = "w"
    //Move count
    var moveCount = 1;
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
        if (moveCount % 2 == 1) {
            color = "w";
        }else{
            color = "b";
        }
        console.log(color);
        console.log(moveCount);
        for (let i = 0; i < boardsize * boardsize; i++) {
            let x = Math.floor(i / boardsize);
            let y = i % boardsize;
    
            // Set the fillStyle based on the normal fields' color pattern
            ctx.fillStyle = (x + y) % 2 !== 0 ? "#AAAAAA" : "#111111";
    
            // Update the fillStyle based on the board piece
            switch (board[x][y]) {
                case 1: // pawn
                    ctx.fillStyle = "pink";
                    break;
                case 2: // knight
                    ctx.fillStyle = "green";
                    break;
                case 3: // bishop
                    ctx.fillStyle = "blue";
                    break;
                case 5: // rook
                    ctx.fillStyle = "red";
                    break;
                case 9: // queen
                    ctx.fillStyle = "purple";
                    break;
                case 10: // king
                    ctx.fillStyle = "yellow";
                    break;
            }
    
            // Draw the rectangle for the current field
            ctx.fillRect(fieldsize * x, fieldsize * y, fieldsize, fieldsize);
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
