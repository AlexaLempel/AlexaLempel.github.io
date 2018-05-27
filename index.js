import Game from "./lib/game";
import Display from "./lib/display";
import Player from "./lib/player";
import Computer from "./lib/computer";

const CELL_SIZE = 35;


document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("canvas");
  const ctx = canvasEl.getContext("2d");
  canvasEl.width = CELL_SIZE * 14 + 1;
  canvasEl.height = CELL_SIZE * 14 + 1;
  const player1 = new Player("Player1");
  // const player2 = new Player("Player2");
  const player2 = new Computer("Player2");
  const game = new Game(player1, player2);
  const display = new Display(game.board.grid, ctx);

// testing
  window.game = game;
  window.relevantMoves = player2.relevantMoves;

  const clickHandler = (e) => {
    // const xPosition = e.clientY;
    // const yPosition = e.clientX;
    const xPosition = e.pageY - canvasEl.offsetTop;
    const yPosition = e.pageX - canvasEl.offsetLeft;
    console.log([Math.round(xPosition/35), Math.round(yPosition/35)]);
    const move = [Math.round(xPosition/35), Math.round(yPosition/35)];
    try {
      game.board.placeStone(move);
      // canvasEl.removeEventListener("mousedown", clickHandler);
      display.render(move);
      game.switchPlayer();
    }
    catch(error) {
      console.log(error);
    }

    if (game.isOver()){
      console.log("Game over!");
      canvasEl.removeEventListener("mousedown", clickHandler);
    } else if (game.currentPlayer === "PLAYER2" && player2 instanceof Computer) {
      setTimeout(() => {
        canvasEl.removeEventListener("mousedown", clickHandler);
        const cpuMove = player2.getMove(game.board);
        game.board.placeStone(cpuMove);
        display.render(cpuMove);
        game.switchPlayer();
        canvasEl.addEventListener("mousedown", clickHandler);
      }, 15);
    }

  };

  canvasEl.addEventListener("mousedown", clickHandler);
});
