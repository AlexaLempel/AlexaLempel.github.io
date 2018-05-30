import Game from "./lib/game";
import Display from "./lib/display";
import Player from "./lib/player";
import Computer from "./lib/computer";

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

// testing
  window.game = game;
  window.relevantMoves = player2.relevantMoves;


  const setupModal = document.getElementById("setup-modal");
  setupModal.classList.add("active-modal");
  setupModal.addEventListener("click", () => setupModal.classList.remove("active-modal"));

  const setupForm = document.getElementById("setup-form");
  setupForm.addEventListener("click", e => e.stopPropagation());
  setupForm.addEventListener("submit", e => {
    e.preventDefault();
    const playerRadios = document.getElementsByName("player2");
    if (playerRadios[1].checked){
      const turnRadios = document.getElementsByName("color");
      if (turnRadios[0].checked) {
        player2 = new Computer("Player2");
        game = new Game(player1, player2);
        display = new Display(game.board.grid, ctx);
      }else {
        player2 = new Computer("Player2");
        game = new Game(player2, player1);
        display = new Display(game.board.grid, ctx);

        const cpuMove = player2.getMove(game.board);
        game.board.placeStone(cpuMove);
        console.log(`cpuMove: ${cpuMove}`);
        display.render(cpuMove);
        game.switchPlayer();
      }
    }
    setupModal.classList.remove("active-modal");
  });

  const clickHandler = (e) => {
    const xPosition = e.pageY - canvasEl.offsetTop - 35;
    const yPosition = e.pageX - canvasEl.offsetLeft - 35;
    console.log([Math.round(xPosition/35), Math.round(yPosition/35)]);
    const move = [Math.round(xPosition/35), Math.round(yPosition/35)];

    try {
      game.board.placeStone(move);
      display.render(move);
      game.switchPlayer();

      if (game.isOver()){
        console.log("Game over!");
        canvasEl.removeEventListener("mousedown", clickHandler);
      } else if (player2 instanceof Computer) {
        const thinkingModal = document.getElementById("thinking-modal");
        thinkingModal.classList.add("active-modal");
        setTimeout(() => {
          canvasEl.removeEventListener("mousedown", clickHandler);
          const cpuMove = player2.getMove(game.board);
          game.board.placeStone(cpuMove);
          console.log(`cpuMove: ${cpuMove}`);
          display.render(cpuMove);
          thinkingModal.classList.remove("active-modal");

          if (game.isOver()){
            console.log("Game over!");
          }else {
            game.switchPlayer();
            canvasEl.addEventListener("mousedown", clickHandler);
          }
        }, 15);
      }
    }
    catch(error) {
      alert(error);
      console.log(error);
    }
  };

  const settingsButton = document.getElementById("settings-button");
  settingsButton.addEventListener("click", e => {
    e.preventDefault();
    setupModal.classList.add("active-modal");
  });

  const restartButton = document.getElementById("restart-button");
  restartButton.addEventListener("click", e => {
    e.preventDefault();

    if (game.player1 instanceof Computer) {
      game = new Game(player2, player1);
      display = new Display(game.board.grid, ctx);
      const cpuMove = player2.getMove(game.board);
      game.board.placeStone(cpuMove);
      console.log(`cpuMove: ${cpuMove}`);
      display.render(cpuMove);
      game.switchPlayer();
    } else {
      game = new Game(player1, player2);
      display = new Display(game.board.grid, ctx);
    }
  });

  canvasEl.addEventListener("mousedown", clickHandler);
});
