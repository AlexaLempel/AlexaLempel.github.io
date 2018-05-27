import Player from "./player";
import { uniqBy } from "lodash";

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
          // maybe change x,y, xmax, ymax to 2-3 -4?
          const xMax = Math.min(i+2, grid.length-1);
          const yMax = Math.min(j+2, grid.length-1);

          for (let x = Math.max(i-2, 0); x <= xMax; x++) {
            for (let y = Math.max(j-2, 0); y <= yMax; y++) {

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
    const color = board.stoneCount % 2 === 0 ? 2 : 1;

    let position;
    let score = Number.NEGATIVE_INFINITY;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {

        if (possibleMoves[i][j] && !grid[i][j]) {
          grid[i][j] = color;
          const moveScore = this.minimax(
            grid, minimaxCurrentDepth, minimaxTargetDepth, false,
            Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, possibleMoves, color);
          grid[i][j] = 0;

          if (moveScore > score) {
            score = moveScore;
            position = { x:i , y:j };
          }
        }
      }
    }
    return [position.x, position.y];
  }

  minimax(grid, currentDepth, targetDepth, isMaximizingPlayer, alpha, beta, possibleMoves, cpuColor) {
    // also need to check if its a terminal gamestate, i.e won!!!!!!!
    if (currentDepth === targetDepth) {
      return this.evaluate(grid, cpuColor);
    }
    // currentDepth relies on stoneCount
    // black goes first, its placeholder is "2"
    const color = currentDepth % 2 === 0 ? 2 : 1;

    if (isMaximizingPlayer) {
      let bestVal = Number.NEGATIVE_INFINITY;

      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
          if (possibleMoves[i][j] && !grid[i][j]) {
            grid[i][j] = color;
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
            grid[i][j] = color;
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

  evaluate(grid, color){
    return Math.round(Math.random() * 1000);
  }
}

// hard code opening
// evaluator function

// zobrist and hashmap
