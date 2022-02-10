import Board from "./board";

const GRID_SIZE = 15;
const WINNING_SEQUENCE = 5;

export default class Game {
  constructor(board = new Board(GRID_SIZE, WINNING_SEQUENCE)){
    this.board = board;
  }

  isOver(){
    return this.board.checkForWinner();
  }

  switchPlayer() {
    this.board.switchColor();
  }
}
