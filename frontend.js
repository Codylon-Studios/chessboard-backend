function fillBoard() {
    let board = document.getElementById("chess-board");
    for (let column = 0; column < 8; column++) {
        for (let row = 0; row < 8; row++) {
            let field = document.createElement("div");
            field.classList.add("chess-field");
            field.classList.add("chess-field-" + (((column + row) % 2) ? "black" : "white"));
            board.appendChild(field);
            field.addEventListener("click", () => {
                let index = [...board.children].indexOf(field);
                console.log(index);
            })
        }
    }
}

fillBoard();
