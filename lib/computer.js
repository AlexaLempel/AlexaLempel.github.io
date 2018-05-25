import Player from "./player";

export default class Computer extends Player {
  constructor(name){
    super(name);
  }

  getMove(board) {
    console.log(board.grid);
    const x = Math.round(Math.random() * 14);
    const y = Math.round(Math.random() * 14);
    return [x,y];
  }
}

// board evaluation function based on threes, fours etc
// possible moves
// deep clone to reset board
// minimax w/ a/b pruning
// this.stonecount on board for node depth
// hard code openings for gomoku

// proof number search?
