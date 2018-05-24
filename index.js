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
  game.play();

  requestAnimationFrame(display.render);
});
