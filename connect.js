// Connect Four

const playerRed = 'R';
const playerYellow = 'Y';
let currPlayer = playerRed; // active player: 1 or 2

let gameOver = false;
let board; // array of rows, each row is array of cells  (board[y][x])
let currColumns;

const rows = 6;
const cols = 7;

// Set the winner
function setWinner(r, c) {
  const winner = document.getElementById('winner');
  if (board[r][c] === playerRed) {
    winner.innerText = 'Red Wins!';
  } else {
    winner.innerText = 'Yellow Wins!';
  }

  gameOver = true;
}

// Check for winner
// This will be called every time a piece is placed
function checkWinner() {
  // Horizontally
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols - 3; c += 1) {
      if (board[r][c] !== ' ') {
        if (board[r][c] === board[r][c + 1]
           && board[r][c + 1] === board[r][c + 2]
            && board[r][c + 2] === board[r][c + 3]) {
          setWinner(r, c);
          return;
        }
      }
    }
  }
  // Vertically
  for (let c = 0; c < cols; c += 1) {
    for (let r = 0; r < rows - 3; r += 1) {
      if (board[r][c] !== ' ') {
        if (board[r][c] === board[r + 1][c]
          && board[r + 1][c] === board[r + 2][c]
          && board[r + 2][c] === board[r + 3][c]) {
          setWinner(r, c);
          return;
        }
      }
    }
  }
  // Anti-Diagonal
  for (let r = 0; r < rows - 3; r += 1) {
    for (let c = 0; c < cols - 3; c += 1) {
      if (board[r][c] !== ' ') {
        if (board[r][c] === board[r + 1][c + 1]
          && board[r + 1][c + 1] === board[r + 2][c + 2]
          && board[r + 2][c + 2] === board[r + 3][c + 3]) {
          setWinner(r, c);
          return;
        }
      }
    }
  }
  // Diagonally
  for (let r = 3; r < rows; r += 1) {
    for (let c = 0; c < cols - 3; c += 1) {
      if (board[r][c] !== ' ') {
        if (board[r][c] === board[r - 1][c + 1]
          && board[r - 1][c + 1] === board[r - 2][c + 2]
          && board[r - 2][r + 2] === board[r - 3][c + 3]) {
          setWinner(r, c);
          return;
        }
      }
    }
  }
}

// The click Handler Function
function handleClick() {
  if (gameOver) {
    return;
  }

  const coords = this.id.split('-'); // '0-0' -> ['0'-'0']
  // We have to parse them as int
  let r = parseInt(coords[0]);
  const c = parseInt(coords[1]);

  // Update r
  r = currColumns[c];
  if (r < 0) {
    return;
  }

  // Update board in JS
  board[r][c] = currPlayer;
  // Same for HTML
  // After updating r, the tile changes from 'this' to the tile below
  // const tile = this;
  const tile = document.getElementById(`${r.toString()}-${c.toString()}`); // '0-0' -> ['0'-'0']
  if (currPlayer === playerRed) {
    tile.classList.add('red-piece');
    currPlayer = playerYellow;
  } else {
    tile.classList.add('yellow-piece');
    currPlayer = playerRed;
  }
  // After placing that piece, We should update r
  r -= 1; // Subtract by 1 to move up a row, Update row height
  currColumns[c] = r; // Update the array to reflect the new r

  // Check for win
  checkWinner();
}

// Set up the tiles within the board
function setGame() {
  // create a new board
  board = [];
  currColumns = [5, 5, 5, 5, 5, 5, 5];

  for (let r = 0; r < rows; r += 1) {
    // create a new row
    const row = [];
    for (let c = 0; c < cols; c += 1) {
      // for JS board, add a new tile
      row.push(' ');
      // for HTML board, add a new tile
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.id = `${r.toString()}-${c.toString()}`;
      tile.addEventListener('click', handleClick);
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


makeHtmlBoard();