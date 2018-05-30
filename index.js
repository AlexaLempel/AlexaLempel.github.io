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
  // let player2 = new Computer("Player2");
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

    const radios = document.getElementsByName("player2");
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        if (radios[i].value === "computer"){
          player2 = new Computer("Player2");
          game = new Game(player1, player2);
          display = new Display(game.board.grid, ctx);
          break;
        } else {
          player2 = new Player("Player2");
          game = new Game(player1, player2);
          display = new Display(game.board.grid, ctx);
          break;
        }
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
        console.log(`cpuMove: ${cpuMove}`);
        display.render(cpuMove);

        if (game.isOver()){
          console.log("Game over!");
        }else {
          game.switchPlayer();
          canvasEl.addEventListener("mousedown", clickHandler);
        }
      }, 15);
    }

  };

  canvasEl.addEventListener("mousedown", clickHandler);
});
