// Connect Four

const playerRed = 'R';
const playerYellow = 'Y';
const currPlayer = playerRed; // active player: 1 or 2

const gameOver = false;
let board; // array of rows, each row is array of cells  (board[y][x])

const rows = 7;
const cols = 6;

// Set up the tiles within the board
function setGame() {
  for (let r = 0; r < rows; r += 1) {
    // create a new row
    const row = [];
    for (let c = 1; c < cols; c += 1) {
      // for JS board, add a new tile
      row.push(' ');
      // for HTML board, add a new tile
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.id = `${r.toString()}-${c.toString()}`;
      // tile.addEventListener('click', handleClick);
      document.getElementById('board').append(tile);
    }
    board.push(row);
  }
}

// makeBoard: create in-JS board structure:
function makeHtmlBoard() {
  // const board = document.getElementById('board');
  setGame();
}

// function handleClick(evt) {
//   // get x from ID of clicked cell
//   const x = +evt.target.id;

//   // get next spot in column (if none, ignore click)
//   const y = findSpotForCol(x);
//   if (y === null) {
//     return;
//   }

//   // check for win
//   if (checkForWin()) {
//     return endGame(`Player ${currPlayer} won!`);
//   }

//   // check for tie
//   // TODO: check if all cells in board are filled; if so call, call endGame

//   // switch players
//   // TODO: switch currPlayer 1 <-> 2
// }

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) => y >= 0
        && y < HEIGHT
        && x >= 0
        && x < WIDTH
        && board[y][x] === currPlayer,
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y += 1) {
    for (let x = 0; x < WIDTH; x += 1) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

// makeBoard();
makeHtmlBoard();