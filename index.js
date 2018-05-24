import Game from "./lib/game";
import Display from "./lib/display";
import Player from "./lib/player";

const CELL_SIZE = 35;

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("canvas");
  const ctx = canvasEl.getContext("2d");
  canvasEl.width = CELL_SIZE * 14;
  canvasEl.height = CELL_SIZE * 14;
  const player1 = new Player("Player1");
  const player2 = new Player("Player2");
  const game = new Game(player1, player2);
  window.game = game;
  const display = new Display(game, ctx);

  const clickHandler = (e) => {
    const xPosition = e.clientY;
    const yPosition = e.clientX;
    console.log("in click handler");
    console.log([Math.round(xPosition/35), Math.round(yPosition/35)]);
    const move = [Math.round(xPosition/35), Math.round(yPosition/35)];
    try {
      game.board.placeStone(move);
      display.render();
      game.switchPlayer();
    } catch(error) {
      console.log(error);
    }

    if (game.isOver()){
      console.log("Game over!");
    }

  };

  canvasEl.addEventListener("mousedown", clickHandler);
});
