const WHITE = "white";
const BLACK = "black";

export default class Board {
  constructor(gridSize, winningSequence) {
    this.gridSize = gridSize;
    this.winningSequence = winningSequence;
    this.color = BLACK;
    this.grid = this.buildGrid(this.gridSize);
    this.lastPos = null;
    this.stoneCount = 0;
  }

  buildGrid(size){
    let grid = [];
    for (let i = 0; i < size; i++) {
      let row = [];

      for (let j = 0; j < size; j++) {
        row.push(0);
      }

      grid.push(row);
    }
    return grid;
  }

  placeStone(pos) {
    const [row, col] = pos;
    if (this.grid[row][col] !== 0) {
      throw "Invalid move!";
    }
    this.grid[row][col] = this.color === WHITE ? 1 : 2;
    this.lastPos = pos;
    this.stoneCount += 1;
  }
  // default is 0, white is 1, black is 2

  switchColor(){
    this.color = this.color === WHITE ? BLACK : WHITE;
  }


  checkForWinner() {
    if (this.lastPos === null) return false;
    if (this.rowWinner()) return true;
    if (this.columnWinner()) return true;
    if (this.upDiagWinner()) return true;
    if (this.downDiagWinner()) return true;
    return false;
  }

  rowWinner() {
    const pieceRow = this.lastPos[0];
    const pieceCol = this.lastPos[1];
    const pieceNum = this.grid[pieceRow][pieceCol];

    let counter = 0;

    for (let col = pieceCol-4; col <= pieceCol+4; col++) {
      if (col < 0) continue;
      if (col >= this.gridSize) break;

      if (this.grid[pieceRow][col] === pieceNum) {
        counter += 1;
      } else {
        counter = 0;
      }

      if (counter === this.winningSequence) return true;
    }
  }

  columnWinner() {
    const pieceRow = this.lastPos[0];
    const pieceCol = this.lastPos[1];
    const pieceNum = this.grid[pieceRow][pieceCol];

    let counter = 0;

    for (let row = pieceRow-4; row <= pieceRow+4; row++) {
      if (row < 0) continue;
      if (row >= this.gridSize) break;

      if (this.grid[row][pieceCol] === pieceNum) {
        counter += 1;
      } else {
        counter = 0;
      }

      if (counter === this.winningSequence) return true;
    }
  }

  upDiagWinner() {
    const pieceRow = this.lastPos[0];
    const pieceCol = this.lastPos[1];
    const pieceNum = this.grid[pieceRow][pieceCol];

    let counter = 0;

    for (let offset = -4; offset <= 4; offset++) {
      const checkRow = pieceRow - offset;
      const checkCol = pieceCol + offset;

      if (checkRow >= this.gridSize || checkCol < 0) continue;
      if (checkRow < 0 || checkCol >= this.gridSize) break;

      if (this.grid[checkRow][checkCol] === pieceNum) {
        counter += 1;
      } else {
        counter = 0;
      }

      if (counter === this.winningSequence) return true;
    }
  }

  downDiagWinner() {
    const pieceRow = this.lastPos[0];
    const pieceCol = this.lastPos[1];
    const pieceNum = this.grid[pieceRow][pieceCol];

    let counter = 0;

    for (let offset = -4; offset <= 4; offset++) {
      const checkRow = pieceRow + offset;
      const checkCol = pieceCol + offset;

      if (checkRow >= this.gridSize || checkCol >= this.gridSize) break;
      if (checkRow < 0 || checkCol < 0) continue;

      if (this.grid[checkRow][checkCol] === pieceNum) {
        counter += 1;
      } else {
        counter = 0;
      }

      if (counter === this.winningSequence) return true;
    }
  }
}
