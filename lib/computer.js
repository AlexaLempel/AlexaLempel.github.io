import Player from "./player";

export default class Computer extends Player {
  constructor(name){
    super(name);
    this.minimaxCache = {};
  }

  nearbyMoves(grid) {
    let nearby = [];
    for (let i = 0; i < grid.length; i++) {
      nearby[i] = [];
    }

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        if (grid[i][j]) {
          // domain specific knowledge to reduce search space
          const xMax = Math.min(i+1, grid.length-1);
          const yMax = Math.min(j+1, grid.length-1);

          for (let x = Math.max(i-1, 0); x <= xMax; x++) {
            for (let y = Math.max(j-1, 0); y <= yMax; y++) {
              nearby[x][y] = true;
            }
          }
        }
      }
    }
    return nearby;
  }

  getMove(board) {
    // hard-code openings!!!!
    if (board.stoneCount === 0) return [7, 7];

    const grid = board.grid;
    const possibleMoves = this.nearbyMoves(grid);

    const minimaxCurrentDepth = board.stoneCount + 1;
    // current limit seems to be 4 moves ahead
    const minimaxTargetDepth = board.stoneCount + 3;
    const cpuColor = board.stoneCount % 2 === 0 ? 2 : 1;
    const oppColor = cpuColor === 1 ? 2 : 1;

    const winningPosition = this.winningPosition(grid, cpuColor);
    const oppWinningPosition = this.winningPosition(grid, oppColor);
    if (winningPosition) return winningPosition;
    if (oppWinningPosition) return oppWinningPosition;

    const openFour = this.checkOpenFour(grid, cpuColor);
    if (openFour) return openFour;

    let position;
    let score = Number.NEGATIVE_INFINITY;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {

        if (possibleMoves[i][j] && !grid[i][j]) {
          grid[i][j] = cpuColor;
          const moveScore = this.minimax(
            grid, minimaxCurrentDepth, minimaxTargetDepth, false,
            Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, possibleMoves, cpuColor);
          grid[i][j] = 0;

          if (moveScore > score) {
            score = moveScore;
            position = [i,j];
          }
        }
      }
    }
    this.minimaxCache = {};
    return position;
  }

  minimax(grid, currentDepth, targetDepth, isMaximizingPlayer, alpha, beta, possibleMoves, cpuColor) {
    if (currentDepth === targetDepth || this.terminalState(grid)) {
      const gridHash = this.hashFunction(grid);
      if (this.minimaxCache[gridHash]){
        return this.minimaxCache[gridHash];
      } else {
        let value = this.evaluate(grid, cpuColor);
        this.minimaxCache[gridHash] = value;
        return value;
      }
    }
    // currentDepth relies on stoneCount
    // black goes first, its placeholder is "2"
    const currentColor = currentDepth % 2 === 0 ? 2 : 1;

    if (isMaximizingPlayer) {
      let bestVal = Number.NEGATIVE_INFINITY;

      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
          if (possibleMoves[i][j] && !grid[i][j]) {
            grid[i][j] = currentColor;
            const gridHash = this.hashFunction(grid);
            let value;
            if (this.minimaxCache[gridHash]) {
              value = this.minimaxCache[gridHash];
            } else {
              const newMoves = this.nearbyMoves(grid);
              value = this.minimax(grid, currentDepth+1, targetDepth, false, alpha, beta, newMoves, cpuColor);
              this.minimaxCache[gridHash] = value;
            }
            grid[i][j] = 0;
            bestVal = Math.max(bestVal, value);
            alpha = Math.max(alpha, bestVal);
            if (beta <= alpha) break;
          }
        }
      }
      return bestVal;
    } else {
      let bestVal= Number.POSITIVE_INFINITY;

      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
          if (possibleMoves[i][j] && !grid[i][j]) {
            grid[i][j] = currentColor;
            const gridHash = this.hashFunction(grid);
            let value;
            if (this.minimaxCache[gridHash]) {
              value = this.minimaxCache[gridHash];
            } else {
              const newMoves = this.nearbyMoves(grid);
              value = this.minimax(grid, currentDepth+1, targetDepth, true, alpha, beta, newMoves, cpuColor);
              this.minimaxCache[gridHash] = value;
            }
            grid[i][j] = 0;
            bestVal = Math.min(bestVal, value);
            beta = Math.min(beta, bestVal);
            if (beta <= alpha) break;
          }
        }
      }
      return bestVal;
    }
  }

  hashFunction(grid) {
    let hash = 0;
    let gridString = `${grid}`;
    if (gridString.length === 0) {
      return hash;
    }
    for (let i = 0; i < gridString.length; i++) {
      let char = gridString.charCodeAt(i);
      hash = ((hash<<5)-hash)+char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }

  checkOpenFour(grid, color){
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        if (
          (j + 5) in grid &&
          !grid[i][j] &&
          !grid[i][j + 1] &&
          grid[i][j + 2] === color &&
          grid[i][j + 3] === color &&
          grid[i][j + 4] === color &&
          !grid[i][j + 5]
        ) return [i, j + 1];
        if (
          (j + 5) in grid &&
          !grid[i][j] &&
          grid[i][j + 1] === color &&
          grid[i][j + 2] === color &&
          grid[i][j + 3] === color &&
          !grid[i][j + 4] &&
          !grid[i][j + 5]
        ) return [i, j + 4];
        if (
          (i + 5) in grid &&
          !grid[i][j] &&
          !grid[i + 1][j] &&
          grid[i + 2][j] === color &&
          grid[i + 3][j] === color &&
          grid[i + 4][j] === color &&
          !grid[i + 5][j]
        ) return [i + 1, j];
        if (
          (i + 5) in grid &&
          !grid[i][j] &&
          grid[i + 1][j] === color &&
          grid[i + 2][j] === color &&
          grid[i + 3][j] === color &&
          !grid[i + 4][j] &&
          !grid[i + 5][j]
        ) return [i + 4, j];
        if (
          (i + 5) in grid &&
          (j + 5) in grid &&
          !grid[i][j] &&
          !grid[i + 1][j + 1] &&
          grid[i + 2][j + 2] === color &&
          grid[i + 3][j + 3] === color &&
          grid[i + 4][j + 4] === color &&
          !grid[i + 5][j + 5]
        ) return [i + 1, j + 1];
        if (
          (i + 5) in grid &&
          (j + 5) in grid &&
          !grid[i][j] &&
          grid[i + 1][j + 1] === color &&
          grid[i + 2][j + 2] === color &&
          grid[i + 3][j + 3] === color &&
          !grid[i + 4][j + 4] &&
          !grid[i + 5][j + 5]
        ) return [i + 4, j + 4];

        if (
          (i - 5) in grid &&
          (j + 5) in grid &&
          !grid[i][j] &&
          !grid[i - 1][j + 1] &&
          grid[i - 2][j + 2] === color &&
          grid[i - 3][j + 3] === color &&
          grid[i - 4][j + 4] === color &&
          !grid[i - 5][j + 5]
        ) return [i - 1, j + 1];
        if (
          (i - 5) in grid &&
          (j + 5) in grid &&
          !grid[i][j] &&
          grid[i - 1][j + 1] === color &&
          grid[i - 2][j + 2] === color &&
          grid[i - 3][j + 3] === color &&
          !grid[i - 4][j + 4] &&
          !grid[i - 5][j + 5]
        ) return [i - 4, j + 4];
      }
    }
  }

  winningPosition(grid, color){
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {

        for (let offsetCoord = 0; offsetCoord <= 4; offsetCoord++) {
          const otherCoords = [0, 1, 2, 3, 4].filter( coord => coord !== offsetCoord);

          if (
            (j + 4) in grid &&
            !grid[i][j + offsetCoord] &&
            grid[i][j + otherCoords[0]] === color &&
            grid[i][j + otherCoords[1]] === color &&
            grid[i][j + otherCoords[2]] === color &&
            grid[i][j + otherCoords[3]] === color
          ) return [i, j + offsetCoord];

          if (
            (i + 4) in grid &&
            !grid[i + offsetCoord][j] &&
            grid[i + otherCoords[0]][j] === color &&
            grid[i + otherCoords[1]][j] === color &&
            grid[i + otherCoords[2]][j] === color &&
            grid[i + otherCoords[3]][j] === color
          ) return [i + offsetCoord, j];

          if (
            (i + 4) in grid &&
            (j + 4) in grid &&
            !grid[i + offsetCoord][j + offsetCoord] &&
            grid[i + otherCoords[0]][j + otherCoords[0]] === color &&
            grid[i + otherCoords[1]][j + otherCoords[1]] === color &&
            grid[i + otherCoords[2]][j + otherCoords[2]] === color &&
            grid[i + otherCoords[3]][j + otherCoords[3]] === color
          ) return [i + offsetCoord, j + offsetCoord];


          if (
            (i - 4) in grid &&
            (j + 4) in grid &&
            !grid[i - offsetCoord][j + offsetCoord] &&
            grid[i - otherCoords[0]][j + otherCoords[0]] === color &&
            grid[i - otherCoords[1]][j + otherCoords[1]] === color &&
            grid[i - otherCoords[2]][j + otherCoords[2]] === color &&
            grid[i - otherCoords[3]][j + otherCoords[3]] === color
          ) return [i - offsetCoord, j + offsetCoord];
        }
      }
    }
  }

  terminalState(grid) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        if (
          ((j + 4) in grid &&
          grid[i][j] === 1 &&
          grid[i][j + 1] === 1 &&
          grid[i][j + 2] === 1 &&
          grid[i][j + 3] === 1 &&
          grid[i][j + 4] === 1) ||

          ((j + 4) in grid &&
          grid[i][j] === 2 &&
          grid[i][j + 1] === 2 &&
          grid[i][j + 2] === 2 &&
          grid[i][j + 3] === 2 &&
          grid[i][j + 4] === 2)
        ) return true;
        if (
          ((i + 4) in grid &&
          grid[i][j] === 1 &&
          grid[i + 1][j] === 1 &&
          grid[i + 2][j] === 1 &&
          grid[i + 3][j] === 1 &&
          grid[i + 4][j] === 1) ||

          ((i + 4) in grid &&
          grid[i][j] === 2 &&
          grid[i + 1][j] === 2 &&
          grid[i + 2][j] === 2 &&
          grid[i + 3][j] === 2 &&
          grid[i + 4][j] === 2)
        ) return true;
        if (
          ((i + 4) in grid &&
          (j + 4) in grid &&
          grid[i][j] === 1 &&
          grid[i + 1][j + 1] === 1 &&
          grid[i + 2][j + 2] === 1 &&
          grid[i + 3][j + 3] === 1 &&
          grid[i + 4][j + 4] === 1) ||

          ((i + 4) in grid &&
          (j + 4) in grid &&
          grid[i][j] === 2 &&
          grid[i + 1][j + 1] === 2 &&
          grid[i + 2][j + 2] === 2 &&
          grid[i + 3][j + 3] === 2 &&
          grid[i + 4][j + 4] === 2)
        ) return true;
        if (
          ((i - 4) in grid &&
          (j + 4) in grid &&
          grid[i][j] === 1 &&
          grid[i - 1][j + 1] === 1 &&
          grid[i - 2][j + 2] === 1 &&
          grid[i - 3][j + 3] === 1 &&
          grid[i - 4][j + 4] === 1) ||

          ((i - 4) in grid &&
          (j + 4) in grid &&
          grid[i][j] === 2 &&
          grid[i - 1][j + 1] === 2 &&
          grid[i - 2][j + 2] === 2 &&
          grid[i - 3][j + 3] === 2 &&
          grid[i - 4][j + 4] === 2)
        ) return true;
      }
    }
  }

  evaluate(grid, cpuColor){
    const oppColor = cpuColor === 2 ? 1 : 2;

    function hasFive(color) {
      let count = 0;

      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
          if (
            (j + 4) in grid &&
            grid[i][j] === color &&
            grid[i][j + 1] === color &&
            grid[i][j + 2] === color &&
            grid[i][j + 3] === color &&
            grid[i][j + 4] === color
          ) count++;
          else if (
            (i + 4) in grid &&
            grid[i][j] === color &&
            grid[i + 1][j] === color &&
            grid[i + 2][j] === color &&
            grid[i + 3][j] === color &&
            grid[i + 4][j] === color
          ) count++;
          else if (
            (i + 4) in grid &&
            (j + 4) in grid &&
            grid[i][j] === color &&
            grid[i + 1][j + 1] === color &&
            grid[i + 2][j + 2] === color &&
            grid[i + 3][j + 3] === color &&
            grid[i + 4][j + 4] === color
          ) count++;
          else if (
            (i - 4) in grid &&
            (j + 4) in grid &&
            grid[i][j] === color &&
            grid[i - 1][j + 1] === color &&
            grid[i - 2][j + 2] === color &&
            grid[i - 3][j + 3] === color &&
            grid[i - 4][j + 4] === color
          ) count++;
        }
      }
      return count;
    }

    function hasOpenFour(color) {
      let count = 0;

      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
          if (
            (j + 5) in grid &&
            !grid[i][j] &&
            grid[i][j + 1] === color &&
            grid[i][j + 2] === color &&
            grid[i][j + 3] === color &&
            grid[i][j + 4] === color &&
            !grid[i][j + 5]
          ) count++;
          else if (
            (i + 5) in grid &&
            !grid[i][j] &&
            grid[i + 1][j] === color &&
            grid[i + 2][j] === color &&
            grid[i + 3][j] === color &&
            grid[i + 4][j] === color &&
            !grid[i + 5][j]
          ) count++;
          else if (
            (i + 5) in grid &&
            (j + 5) in grid &&
            !grid[i][j] &&
            grid[i + 1][j + 1] === color &&
            grid[i + 2][j + 2] === color &&
            grid[i + 3][j + 3] === color &&
            grid[i + 4][j + 4] === color &&
            !grid[i + 5][j + 5]
          ) count++;
          else if (
            (i - 5) in grid &&
            (j + 5) in grid &&
            !grid[i][j] &&
            grid[i - 1][j + 1] === color &&
            grid[i - 2][j + 2] === color &&
            grid[i - 3][j + 3] === color &&
            grid[i - 4][j + 4] === color &&
            !grid[i - 5][j + 5]
          ) count++;
        }
      }
      return count;
    }

    function hasFour(color) {
      let count = 0;

      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
          if (
            ((j + 4) in grid &&
            !grid[i][j] &&
            grid[i][j + 1] === color &&
            grid[i][j + 2] === color &&
            grid[i][j + 3] === color &&
            grid[i][j + 4] === color) ||

            ((j + 4) in grid &&
            grid[i][j] === color &&
            grid[i][j + 1] === color &&
            grid[i][j + 2] === color &&
            grid[i][j + 3] === color &&
            !grid[i][j + 4])
          ) count++;
          if (
            ((i + 4) in grid &&
            !grid[i][j] &&
            grid[i + 1][j] === color &&
            grid[i + 2][j] === color &&
            grid[i + 3][j] === color &&
            grid[i + 4][j] === color) ||

            ((i + 4) in grid &&
            grid[i][j] === color &&
            grid[i + 1][j] === color &&
            grid[i + 2][j] === color &&
            grid[i + 3][j] === color &&
            !grid[i + 4][j])
          ) count++;
          if (
            ((i + 4) in grid &&
            (j + 4) in grid &&
            !grid[i][j] &&
            grid[i + 1][j + 1] === color &&
            grid[i + 2][j + 2] === color &&
            grid[i + 3][j + 3] === color &&
            grid[i + 4][j + 4] === color) ||

            ((i + 4) in grid &&
            (j + 4) in grid &&
            grid[i][j] === color &&
            grid[i + 1][j + 1] === color &&
            grid[i + 2][j + 2] === color &&
            grid[i + 3][j + 3] === color &&
            !grid[i + 4][j + 4])
          ) count++;
          if (
            ((i - 4) in grid &&
            (j + 4) in grid &&
            !grid[i][j] &&
            grid[i - 1][j + 1] === color &&
            grid[i - 2][j + 2] === color &&
            grid[i - 3][j + 3] === color &&
            grid[i - 4][j + 4] === color) ||

            ((i - 4) in grid &&
            (j + 4) in grid &&
            grid[i][j] === color &&
            grid[i - 1][j + 1] === color &&
            grid[i - 2][j + 2] === color &&
            grid[i - 3][j + 3] === color &&
            !grid[i - 4][j + 4])
          ) count++;
        }
      }
      return count;
    }

    function hasOpenThree(color) {
      let count = 0;

      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
          if ((
            (j + 5) in grid &&
            !grid[i][j] &&
            !grid[i][j + 1] &&
            grid[i][j + 2] === color &&
            grid[i][j + 3] === color &&
            grid[i][j + 4] === color &&
            !grid[i][j + 5]) ||

            ((j + 5) in grid &&
            !grid[i][j] &&
            grid[i][j + 1] === color &&
            grid[i][j + 2] === color &&
            grid[i][j + 3] === color &&
            !grid[i][j + 4] &&
            !grid[i][j + 5]
          ))count++;
          if (
            ((i + 5) in grid &&
            !grid[i][j] &&
            !grid[i + 1][j] &&
            grid[i + 2][j] === color &&
            grid[i + 3][j] === color &&
            grid[i + 4][j] === color &&
            !grid[i + 5][j]) ||

            ((i + 5) in grid &&
            !grid[i][j] &&
            grid[i + 1][j] === color &&
            grid[i + 2][j] === color &&
            grid[i + 3][j] === color &&
            !grid[i + 4][j] &&
            !grid[i + 5][j])
          ) count++;
          if (
            ((i + 5) in grid &&
            (j + 5) in grid &&
            !grid[i][j] &&
            !grid[i + 1][j + 1] &&
            grid[i + 2][j + 2] === color &&
            grid[i + 3][j + 3] === color &&
            grid[i + 4][j + 4] === color &&
            !grid[i + 5][j + 5]) ||

            ((i + 5) in grid &&
            (j + 5) in grid &&
            !grid[i][j] &&
            grid[i + 1][j + 1] === color &&
            grid[i + 2][j + 2] === color &&
            grid[i + 3][j + 3] === color &&
            !grid[i + 4][j + 4] &&
            !grid[i + 5][j + 5])
          ) count++;
          if (
            ((i - 5) in grid &&
            (j + 5) in grid &&
            !grid[i][j] &&
            !grid[i - 1][j + 1] &&
            grid[i - 2][j + 2] === color &&
            grid[i - 3][j + 3] === color &&
            grid[i - 4][j + 4] === color &&
            !grid[i - 5][j + 5]) ||

            ((i - 5) in grid &&
            (j + 5) in grid &&
            !grid[i][j] &&
            grid[i - 1][j + 1] === color &&
            grid[i - 2][j + 2] === color &&
            grid[i - 3][j + 3] === color &&
            !grid[i - 4][j + 4] &&
            !grid[i - 5][j + 5])
          ) count++;
        }
      }
      return count;
    }

    function hasThree(color) {
      let count = 0;

      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
          if (
            ((j + 4) in grid &&
            !grid[i][j] &&
            !grid[i][j + 1] &&
            grid[i][j + 2] === color &&
            grid[i][j + 3] === color &&
            grid[i][j + 4] === color) ||

            ((j + 4) in grid &&
            grid[i][j] === color &&
            grid[i][j + 1] === color  &&
            grid[i][j + 2] === color &&
            !grid[i][j + 3] &&
            !grid[i][j + 4])
          ) count++;
          if (
            ((i + 4) in grid &&
            !grid[i][j] &&
            !grid[i + 1][j] &&
            grid[i + 2][j] === color &&
            grid[i + 3][j] === color &&
            grid[i + 4][j] === color) ||

            ((i + 4) in grid &&
            grid[i][j] === color &&
            grid[i + 1][j] === color  &&
            grid[i + 2][j] === color &&
            !grid[i + 3][j] &&
            !grid[i + 4][j])
          ) count++;
          if (
            ((i + 4) in grid &&
            (j + 4) in grid &&
            !grid[i][j] &&
            !grid[i + 1][j + 1] &&
            grid[i + 2][j + 2] === color &&
            grid[i + 3][j + 3] === color &&
            grid[i + 4][j + 4] === color) ||

            ((i + 4) in grid &&
            (j + 4) in grid &&
            grid[i][j] === color &&
            grid[i + 1][j + 1] === color &&
            grid[i + 2][j + 2] === color &&
            !grid[i + 3][j + 3] &&
            !grid[i + 4][j + 4])
          ) count++;
          if (
            ((i - 4) in grid &&
            (j + 4) in grid &&
            !grid[i][j] &&
            !grid[i - 1][j + 1] &&
            grid[i - 2][j + 2] === color &&
            grid[i - 3][j + 3] === color &&
            grid[i - 4][j + 4] === color) ||

            ((i - 4) in grid &&
            (j + 4) in grid &&
            grid[i][j] === color &&
            grid[i - 1][j + 1] === color &&
            grid[i - 2][j + 2] === color &&
            !grid[i - 3][j + 3] &&
            !grid[i - 4][j + 4])
          ) count++;
        }
      }
      return count;
    }

    function hasOpenTwo(color) {
      let count = 0;

      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
          if (
            (j + 7) in grid &&
            !grid[i][j] &&
            !grid[i][j + 1] &&
            !grid[i][j + 2] &&
            grid[i][j + 3] === color &&
            grid[i][j + 4] === color &&
            !grid[i][j + 5] &&
            !grid[i][j + 6] &&
            !grid[i][j + 7]
          ) count++;
          if (
            (i + 7) in grid &&
            !grid[i][j] &&
            !grid[i + 1][j] &&
            !grid[i + 2][j] &&
            grid[i + 3][j] === color &&
            grid[i + 4][j] === color &&
            !grid[i + 5][j] &&
            !grid[i + 6][j] &&
            !grid[i + 7][j]
          ) count++;
          if (
            (i + 7) in grid &&
            (j + 7) in grid &&
            !grid[i][j] &&
            !grid[i + 1][j + 1] &&
            !grid[i + 2][j + 2] &&
            grid[i + 3][j + 3] === color &&
            grid[i + 4][j + 4] === color &&
            !grid[i + 5][j + 5] &&
            !grid[i + 6][j + 6] &&
            !grid[i + 7][j + 7]
          ) count++;
          if (
            (i - 7) in grid &&
            (j + 7) in grid &&
            !grid[i][j] &&
            !grid[i - 1][j + 1] &&
            !grid[i - 2][j + 2] &&
            grid[i - 3][j + 3] === color &&
            grid[i - 4][j + 4] === color &&
            !grid[i - 5][j + 5] &&
            !grid[i - 6][j + 6] &&
            !grid[i - 7][j + 7]
          ) count++;
        }
      }
      return count;
    }

    function hasTwo(color) {
      let count = 0;
      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
          if (
            ((j + 4) in grid &&
            !grid[i][j] &&
            !grid[i][j + 1] &&
            !grid[i][j + 2] &&
            grid[i][j + 3] === color &&
            grid[i][j + 4] === color) ||

            ((j + 4) in grid &&
            grid[i][j] === color &&
            grid[i][j + 1] === color  &&
            !grid[i][j + 2] &&
            !grid[i][j + 3] &&
            !grid[i][j + 4])
          ) count++;
          if (
            ((i + 4) in grid &&
            !grid[i][j] &&
            !grid[i + 1][j] &&
            !grid[i + 2][j] &&
            grid[i + 3][j] === color &&
            grid[i + 4][j] === color) ||

            ((i + 4) in grid &&
            grid[i][j] === color &&
            grid[i + 1][j] === color  &&
            !grid[i + 2][j] &&
            !grid[i + 3][j] &&
            !grid[i + 4][j])
          ) count++;
          if (
            ((i + 4) in grid &&
            (j + 4) in grid &&
            !grid[i][j] &&
            !grid[i + 1][j + 1] &&
            !grid[i + 2][j + 2] &&
            grid[i + 3][j + 3] === color &&
            grid[i + 4][j + 4] === color) ||

            ((i + 4) in grid &&
            (j + 4) in grid &&
            grid[i][j] === color &&
            grid[i + 1][j + 1] === color &&
            !grid[i + 2][j + 2] &&
            !grid[i + 3][j + 3] &&
            !grid[i + 4][j + 4])
          ) count++;
          if (
            ((i - 4) in grid &&
            (j + 4) in grid &&
            !grid[i][j] &&
            !grid[i - 1][j + 1] &&
            !grid[i - 2][j + 2] &&
            grid[i - 3][j + 3] === color &&
            grid[i - 4][j + 4] === color) ||

            ((i - 4) in grid &&
            (j + 4) in grid &&
            grid[i][j] === color &&
            grid[i - 1][j + 1] === color &&
            !grid[i - 2][j + 2] &&
            !grid[i - 3][j + 3] &&
            !grid[i - 4][j + 4])
          ) count++;
        }
      }
      return count;
    }

    const openFours =  hasOpenFour(cpuColor);
    const closedFours = hasFour(cpuColor) - openFours;
    const openThrees = hasOpenThree(cpuColor);
    const closedThrees = hasThree(cpuColor) - openThrees;
    const openTwos = hasOpenTwo(cpuColor);
    const closedTwos = hasTwo(cpuColor) - openTwos;

    const oppOpenFours = hasOpenFour(oppColor);
    const oppClosedFours = hasFour(oppColor) - oppOpenFours;
    const oppOpenThrees = hasOpenThree(oppColor);
    const oppClosedThrees = hasThree(oppColor) - oppOpenThrees;
    const oppOpenTwos = hasOpenTwo(oppColor);
    const oppClosedTwos = hasTwo(oppColor) - oppOpenTwos;

    return (
      ((2 * openTwos) + (1 * closedTwos) +
      (200 * openThrees) + (2 * closedThrees) +
      (2000 * openFours) + (200 * closedFours) +
      (2000 * hasFive(cpuColor))) -

      ((2 * oppOpenTwos) + (1 * oppClosedTwos) +
      (2000 * oppOpenThrees) + (20 * oppClosedThrees) +
      (20000 * oppOpenFours) + (2000 * oppClosedFours) +
      (20000 * hasFive(oppColor)))
    );
  }
}

// hard code opening
// handle "broken 3s" and "broken 4s"

// zobrist and hashmap
