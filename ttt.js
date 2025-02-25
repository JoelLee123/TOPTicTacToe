document.addEventListener("DOMContentLoaded", function () {
    const board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    function createPlayer(name, marker) {
        return { name, marker };
    }

    const playerOne = createPlayer("Player One", "X");
    const playerTwo = createPlayer("Player Two", "O");
    let currentPlayer = playerOne;
    let availableSpaces = 9;

    const cells = document.querySelectorAll(".board-cell");

    // Assign click event to each cell
    cells.forEach((cell, index) => {
        cell.addEventListener("click", function () {
            const row = Math.floor(index / 3);
            const col = index % 3;

            if (board[row][col] !== "") {
                console.log("Invalid move! Cell already taken.");
                return;
            }

            board[row][col] = currentPlayer.marker;
            cell.textContent = currentPlayer.marker; // Update UI

            availableSpaces--;

            if (checkWinner()) {
                alert(`${currentPlayer.name} wins!`);
                resetBoard();
                return;
            }

            if (availableSpaces === 0) {
                alert("It's a tie!");
                resetBoard();
                return;
            }

            switchPlayer();
        });
    });

    function switchPlayer() {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    }

    function checkWinner() {
        const winPatterns = [
            [ [0, 0], [0, 1], [0, 2] ],
            [ [1, 0], [1, 1], [1, 2] ],
            [ [2, 0], [2, 1], [2, 2] ],
            [ [0, 0], [1, 0], [2, 0] ],
            [ [0, 1], [1, 1], [2, 1] ],
            [ [0, 2], [1, 2], [2, 2] ],
            [ [0, 0], [1, 1], [2, 2] ],
            [ [0, 2], [1, 1], [2, 0] ]
        ];

        return winPatterns.some(pattern =>
            pattern.every(([r, c]) => board[r][c] === currentPlayer.marker)
        );
    }

    function resetBoard() {
        board.forEach(row => row.fill(""));
        cells.forEach(cell => (cell.textContent = ""));
        availableSpaces = 9;
        currentPlayer = playerOne;
    }
});
