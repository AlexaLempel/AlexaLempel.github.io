import Player from "./player";

export default class Computer extends Player {
  constructor(name){
    super(name);
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
    const grid = board.grid;
    const possibleMoves = this.nearbyMoves(grid);

    const minimaxCurrentDepth = board.stoneCount + 1;
    // current limit seems to be 4 moves ahead for target depth when expanding vision
    // 5 moves ahead for limited vision
    const minimaxTargetDepth = board.stoneCount + 3;
    const cpuColor = board.stoneCount % 2 === 0 ? 2 : 1;

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
    return position;
  }

  minimax(grid, currentDepth, targetDepth, isMaximizingPlayer, alpha, beta, possibleMoves, cpuColor) {
    // also need to check if its a terminal gamestate, i.e won!!!!!!!
    if (currentDepth === targetDepth) {
      return this.evaluate(grid, cpuColor);
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
            const value = this.minimax(grid, currentDepth+1, targetDepth, false, alpha, beta, possibleMoves, cpuColor);
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
            const value = this.minimax(grid, currentDepth+1, targetDepth, true, alpha, beta, possibleMoves, cpuColor);
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


    function hasDoubleOpenFour(color) {
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

    function hasOpenFour(color) {
      let count = 0;
      


      return count;
    }

    // return Math.round(Math.random() * 1000);
  }
}

// hard code opening
// evaluator function

// zobrist and hashmap
