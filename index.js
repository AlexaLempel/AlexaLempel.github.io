import Game from "./lib/game";
import Display from "./lib/display";
import Player from "./lib/player";

const CELL_SIZE = 35;


document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("canvas");
  const ctx = canvasEl.getContext("2d");
  canvasEl.width = CELL_SIZE * 16 + 1;
  canvasEl.height = CELL_SIZE * 16 + 1;

  const player1 = new Player("Player1");
  let player2 = new Player("Player2");
  let game = new Game(player1, player2);
  let display = new Display(game.board.grid, ctx);

  const clickHandler = (e) => {
    const xPosition = e.pageY - canvasEl.offsetTop - CELL_SIZE ;
    const yPosition = e.pageX - canvasEl.offsetLeft - CELL_SIZE ;
    const move = [Math.round(xPosition/CELL_SIZE ), Math.round(yPosition/CELL_SIZE )];

    try {
      game.board.placeStone(move);
      game.board.checkForJump();
      display.drawBoard();
      display.render(game.board);
      game.switchPlayer();

      if (game.isOver()){
        canvasEl.removeEventListener("mousedown", clickHandler);
        setTimeout(() => {
          gameOverModal.classList.add("active-modal");
        }, 1000);
      }
    }
    catch(error) {
      console.log(error);
    }
  };

  const gameOverModal  = document.getElementById("game-over-modal");
  const restartHandler = e => {
    e.preventDefault();
    game = new Game(player1, player2);
    display = new Display(game.board.grid, ctx);
    gameOverModal.classList.remove("active-modal");
    canvasEl.addEventListener("mousedown", clickHandler);
  };

  canvasEl.addEventListener("mousedown", clickHandler);
});
