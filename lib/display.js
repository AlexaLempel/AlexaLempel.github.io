import Game from "./game";

export default class Display {
  constructor(board, ctx) {
    this.board = board;
    this.ctx = ctx;
    this.drawBoard();
  }

  drawBoard(){
    const canvasEl = document.getElementById("canvas");
    const ctx = this.ctx;
    ctx.fillStyle= "#E2C58B";
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
    for (let i = 0; i <= 15; i++) {
      ctx.beginPath();
      ctx.strokeStyle = "black";
      ctx.moveTo(i*35+ .5,0 +.5);
      ctx.lineTo(i*35 +.5, 35*15 +.5);
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = "black";
      ctx.moveTo(0 +.5, i*35 +.5);
      ctx.lineTo(35*15 +.5, i*35 +.5);
      ctx.stroke();
    }
    ctx.fillStyle = "black";
    ctx.fillRect(35*3-3, 35*3-3, 6, 6);
    ctx.fillRect(35*11-3, 35*3-3, 6, 6);
    ctx.fillRect(35*3-3, 35*11-3, 6, 6);
    ctx.fillRect(35*11-3, 35*11-3, 6, 6);
  }

  render(pos){
    const board = this.board;
    const ctx = this.ctx;
    const [i,j] = pos;

    ctx.fillStyle = board[i][j] === 1 ? "white" : "black";
    ctx.beginPath();
    ctx.arc(j*35, i*35, 15, 0, 2*Math.PI);
    ctx.closePath();
    ctx.fill();
  }
}
