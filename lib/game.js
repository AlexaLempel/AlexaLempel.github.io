import Board from "./board";

const GRID_SIZE = 15;
const WINNING_SEQUENCE = 5;
const PLAYER1 = "PLAYER1";
const PLAYER2 = "PLAYER2";

export default class Game {
  constructor(player1, player2, board = new Board(GRID_SIZE, WINNING_SEQUENCE)){
    this.player1 = player1;
    this.player2 = player2;
    this.board = board;
    this.currentPlayer = PLAYER1;
  }

  playTurn(){
    let move;

    if (this.currentPlayer === PLAYER1) {
      move = this.player1.getMove(this.board);
    } else {
      move = this.player2.getMove(this.board);
    }
    this.board.placeStone(move);
  }

  switchPlayer() {
    this.board.switchColor();
    this.currentPlayer = this.currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1;
  }

// problems faced:
// turning play loop asynch
// rendering appropriately
// callback of handleclick?? returns

  play(){
    while (true) {
      console.log("GAME started!");
      this.playTurn();
      console.log("about to break");
      if (this.board.checkForWinner()) break;
      console.log(this.board);
      this.switchPlayer();
    }

    console.log("GAME OVER!!");
  }
}
