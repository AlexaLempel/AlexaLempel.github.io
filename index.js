import Game from "./lib/game";
import Display from "./lib/display";
import Code from "./lib/code";

const CELL_SIZE = 35;
const queryStr = window.location.search;

window.addEventListener("load", () => {
  const canvasEl = document.getElementById("canvas");
  const ctx = canvasEl.getContext("2d");
  canvasEl.width = CELL_SIZE * 16 + 1;
  canvasEl.height = CELL_SIZE * 16 + 1;

  let game = new Game();
  let display = new Display(game.board.grid, ctx);
  let code = new Code(game.board);

  if(queryStr) {
    game.board = code.decode(queryStr.substring(1), game.board);
    display.drawBoard();
    display.render(game.board);
  }

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
      // else {
      //   code = new Code(game.board);
      //   const url = "https://api.whatsapp.com/send?text=https://alexalempel.github.io?" + code.encode();
      //   setTimeout(() => {
      //     window.location.href = url;
      //   }, 750);
      //   setTimeout(() => {
      //     window.close();
      //   },2000);
      // }
    }
    catch(error) {
      console.log(error);
    }
  };

  canvasEl.addEventListener("mousedown", clickHandler);
});