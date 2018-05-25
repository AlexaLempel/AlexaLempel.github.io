import Player from "./player";
import { cloneDeep } from "lodash";

export default class Computer extends Player {
  constructor(name){
    super(name);
  }

  getMove(board) {
    // console.log(board.grid);
    // const x = Math.round(Math.random() * 14);
    // const y = Math.round(Math.random() * 14);
    // return [x,y];

    // hard code openings

    const currentBoardState = cloneDeep(board.grid);
    const currentDepth = board.stoneCount;
    const targetDepth = board.stoneCount + 4;

  }

  minimax(grid, currentDepth, targetDepth, isMaximizingPlayer, alpha, beta) {
    // also need to check if its a terminal state!!!!

    if (currentDepth === targetDepth) {
      return this.evaluate(grid);
    }

    const gridClone = cloneDeep(grid);
    // currentDepth relies on stoneCount
    // black goes first, its placeholder is "2"
    const color = currentDepth % 2 === 0 ? 2 : 1;
    const childNodes = this.childBoardStates(gridClone, color);

    if (isMaximizingPlayer) {
      let bestVal = -10000000;

      for (let i = 0; i < childNodes.length; i++) {
        const value = this.minimax(childNodes[i], currentDepth+1, targetDepth, false, alpha, beta);
        bestVal = Math.max(bestVal, value);
        alpha = Math.max(alpha, bestVal);
        if (beta <= alpha) break;
      }
      return bestVal;
    } else {
      let bestVal = 10000000;
      for (let i = 0; i < childNodes.length; i++) {
        const value = this.minimax(childNodes[i], currentDepth+1, targetDepth, true, alpha, beta);
        bestVal = Math.min(bestVal, value);
        beta = Math.min(beta, bestVal);
        if (beta <= alpha) break;
      }
      return bestVal;
    }

  // Calling the function for the first time.
  // minimax(0, 0, true, -INFINITY, +INFINITY)
  }

  possibleMoves(grid){
    let moves = [];

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        if (grid[i][j] === 0) {
          moves.push([i,j]);
        }
      }
    }
    return moves;
  }

  childBoardStates(grid, color) {
    const grids = [];

    this.possibleMoves(grid).forEach( move => {
      const [i,j] = move;
      const gridClone = cloneDeep(grid);
      gridClone[i][j] = color;
      grids.push(gridClone);
    });

    return grids;
  }
}

// this.stonecount on board for node depth
// board evaluation function based on threes, fours etc
// deep clone to reset board
// minimax w/ a/b pruning
// hard code openings for gomoku
