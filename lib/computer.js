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

    // hard-code openings!!!!

    const minimaxCurrentDepth = board.stoneCount + 1;
    const minimaxTargetDepth = board.stoneCount + 2;
    // const minimaxCurrentDepth = 0;
    // const minimaxTargetDepth = 1;
    const color = board.stoneCount % 2 === 0 ? 2 : 1;

    // Calling the function for the first time.
    // minimax(0, 0, true, -INFINITY, +INFINITY)
    const moveScores = this.possibleMoves(board.grid).map( move => {
      const [i,j] = move;
      const currentBoardState = cloneDeep(board.grid);
      currentBoardState[i][j] = color;
      return [move, this.minimax(currentBoardState, minimaxCurrentDepth, minimaxTargetDepth, false, -10000000, 10000000)];
    });

    let bestMove = null;
    let bestScore = null;

    moveScores.forEach( moveScorePair => {
      if (!bestScore || moveScorePair[1] > bestScore) {
        bestScore = moveScorePair[1];
        bestMove = moveScorePair[0];
      }
    });

    return bestMove;
  }

  minimax(grid, currentDepth, targetDepth, isMaximizingPlayer, alpha, beta) {
    // also need to check if its a terminal state!!!!!!!

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
        // console.log(alpha, beta);
        if (beta <= alpha) break;
      }
      // console.log(bestVal);
      return bestVal;
    }
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

  evaluate(grid){
    return Math.round(Math.random() * 1000);
  }
}

// reduce search space
// hard code opening
// evaluator function
// extract move within single function call instead of mapping through array

// this.stonecount on board for node depth
// board evaluation function based on threes, fours etc
// hard code openings for gomoku
