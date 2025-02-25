/* 
    An example of using an object to reduce code

// example one
const playerOneName = "tim";
const playerTwoName = "jenn";
const playerOneMarker = "X";
const playerTwoMarker = "O";

// example two
const playerOne = {
  name: "tim",
  marker: "X"
};

const playerTwo = {
  name: "jenn",
  marker: "O"
};

*/

/*
    TODO:
    1. Create main functionality for game (board, players, turns, win conditions)
    2. Create UI for game (HTML, CSS)
    3. Optimize code using objects and factory functions
*/


const game = (function () {
    //Can use const because we do not need to resize the board
    const board = [
        ['','',''],
        ['','',''],
        ['','','']
    ];

    //Factory function to create players
    function createPlayer (name, marker) {
        return {name, marker};
    }
    
    const playerOne = createPlayer("tim", "X");
    const playerTwo = createPlayer("jenn", "O");

    let currentPlayer = playerOne;
    let availableSpaces = 9;

    function printBoard() {
        console.log(board.map(row => row.join(" | ")).join("\n---------\n"));
    }

    function isValidMove(row, col) {
        return board[row][col] === '';
    }

    function makeMove(row, col) {
        if (!isValidMove(row, col)) {
            console.log("Invalid move. Try again.");
            return false;
        }

        board[row][col] = currentPlayer.marker;
        availableSpaces--;

        return true;
    }

    function checkWinnner() {
        const winPatterns = [
            // Rows
            [ [0, 0], [0, 1], [0, 2] ],
            [ [1, 0], [1, 1], [1, 2] ],
            [ [2, 0], [2, 1], [2, 2] ],
            // Columns
            [ [0, 0], [1, 0], [2, 0] ],
            [ [0, 1], [1, 1], [2, 1] ],
            [ [0, 2], [1, 2], [2, 2] ],
            // Diagonals
            [ [0, 0], [1, 1], [2, 2] ],
            [ [0, 2], [1, 1], [2, 0] ]
        ];

        return winPatterns.some(pattern => 
            pattern.every(([r,c]) => board[r][c] === currentPlayer.marker));
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    }

    function play() {

        while (true) {
            printBoard();
            console.log(`It's ${currentPlayer.name}'s turn!`);

            const row = parseInt(prompt("Enter row:"));
            const col = parseInt(prompt("Enter column:"));

            if (row < 0 || row > 2 || col < 0 || col > 2 || isNaN(row) || isNaN(col)) {
                console.log("Invalid input. Please enter numbers between 0 and 2.");
                continue;
            }

            if (makeMove(row, col)) {
                if (checkWinnner()) {
                    printBoard();
                    console.log(`${currentPlayer.name} wins!`);
                    break;
                } else if (availableSpaces === 0) {
                    printBoard();
                    console.log("It's a tie!");
                    break;
                }

                switchPlayer();
            }
        }
    }
    return { play };
})();

game.play();
