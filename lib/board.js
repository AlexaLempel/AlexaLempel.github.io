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
    this.jumpCounts = [0, 0]
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
    if ( row < 0 || row > 14 || col < 0 || col > 14 || this.grid[row][col] !== 0) {
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

  addJump(pieceNum)
  {
    this.jumpCounts[pieceNum - 1] += 1
  }

  checkForJump() {
     this.checkRowJump();
     this.checkColJump();
     this.checkUpDiagJump();
     this.checkDownDiagJump();
  }

  checkRowJump(){
    const pieceRow = this.lastPos[0];
    const pieceCol = this.lastPos[1];
    const pieceNum = this.grid[pieceRow][pieceCol];
    const pieceOpp = pieceNum === 1 ? 2 : 1;

    let col = pieceCol - 3;
    if (col >= 0
        && this.grid[pieceRow][col] === pieceNum
        && this.grid[pieceRow][col + 1] === pieceOpp
        && this.grid[pieceRow][col + 2] === pieceOpp
        )
    {
      this.addJump(pieceNum);
      this.grid[pieceRow][col + 1] = 0;
      this.grid[pieceRow][col + 2] = 0;
    }

    col = pieceCol + 3;
    if (col < this.gridSize
        && this.grid[pieceRow][col] === pieceNum
        && this.grid[pieceRow][col - 1] === pieceOpp
        && this.grid[pieceRow][col - 2] === pieceOpp
        )
    {
      this.addJump(pieceNum);
      this.grid[pieceRow][col - 1] = 0;
      this.grid[pieceRow][col - 2] = 0;
    }
  }
  
  checkColJump(){
    const pieceRow = this.lastPos[0];
    const pieceCol = this.lastPos[1];
    const pieceNum = this.grid[pieceRow][pieceCol];
    const pieceOpp = pieceNum === 1 ? 2 : 1;

    let row = pieceRow - 3;
    if (row >= 0
        && this.grid[row][pieceCol] === pieceNum
        && this.grid[row + 1][pieceCol] === pieceOpp
        && this.grid[row + 2][pieceCol] === pieceOpp
        )
    {
      this.addJump(pieceNum);
      this.grid[row + 1][pieceCol] = 0;
      this.grid[row + 2][pieceCol] = 0;
    }

    row = pieceRow + 3;
    if (row < this.gridSize
        && this.grid[row][pieceCol] === pieceNum
        && this.grid[row - 1][pieceCol] === pieceOpp
        && this.grid[row - 2][pieceCol] === pieceOpp
        )
    {
      this.addJump(pieceNum);
      this.grid[row - 1][pieceCol] = 0;
      this.grid[row - 2][pieceCol] = 0;
    }
  }
  
  checkUpDiagJump(){
    const pieceRow = this.lastPos[0];
    const pieceCol = this.lastPos[1];
    const pieceNum = this.grid[pieceRow][pieceCol];
    const pieceOpp = pieceNum === 1 ? 2 : 1;

    let row = pieceRow - 3;
    let col = pieceCol - 3;
    if (row >= 0 && col >= 0
        && this.grid[row][col] === pieceNum
        && this.grid[row + 1][col + 1] === pieceOpp
        && this.grid[row + 2][col + 2] === pieceOpp
        )
    {
      this.addJump(pieceNum);
      this.grid[row + 1][col + 1] = 0;
      this.grid[row + 2][col + 2] = 0;
    }

    row = pieceRow + 3;
    col = pieceCol + 3;
    if (row < this.gridSize && col < this.gridSize
      && this.grid[row][col] === pieceNum
      && this.grid[row - 1][col - 1] === pieceOpp
      && this.grid[row - 2][col - 2] === pieceOpp
      )
    {
      this.addJump(pieceNum);
      this.grid[row - 1][col - 1] = 0;
      this.grid[row - 2][col - 2] = 0;
    }
  }
  
  checkDownDiagJump(){
    const pieceRow = this.lastPos[0];
    const pieceCol = this.lastPos[1];
    const pieceNum = this.grid[pieceRow][pieceCol];
    const pieceOpp = pieceNum === 1 ? 2 : 1;

    let row = pieceRow - 3;
    let col = pieceCol + 3;
    if (row >= 0 && col < this.gridSize
        && this.grid[row][col] === pieceNum
        && this.grid[row + 1][col - 1] === pieceOpp
        && this.grid[row + 2][col - 2] === pieceOpp
        )
    {
      this.addJump(pieceNum);
      this.grid[row + 1][col - 1] = 0;
      this.grid[row + 2][col - 2] = 0;
    }

    row = pieceRow + 3;
    col = pieceCol - 3;
    if (row < this.gridSize && col >= 0
      && this.grid[row][col] === pieceNum
      && this.grid[row - 1][col + 1] === pieceOpp
      && this.grid[row - 2][col + 2] === pieceOpp
      )
    {
      this.addJump(pieceNum);
      this.grid[row - 1][col + 1] = 0;
      this.grid[row - 2][col + 2] = 0;
    }
  }

  checkForWinner() {
    if (this.lastPos === null) return false;
    if (this.jumpCounts[0] >= this.winningSequence) return true;
    if (this.jumpCounts[1] >= this.winningSequence) return true;
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
