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
    ctx.fillStyle= "#dbb870";
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
    for (let i = 0; i <= 14; i++) {
      ctx.beginPath();
      ctx.strokeStyle = "black";
      ctx.moveTo(i*35 + 35.5,0 + 35.5);
      ctx.lineTo(i*35 + 35.5, 35*15);
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = "black";
      ctx.moveTo(0 + 35.5, i*35 + 35.5);
      ctx.lineTo(35*15, i*35 + 35.5);
      ctx.stroke();
      ctx.closePath();
    }
    ctx.fillStyle = "black";
    ctx.fillRect(35*3+32, 35*3+32, 6, 6);
    ctx.fillRect(35*11+32, 35*3+32, 6, 6);
    ctx.fillRect(35*7+32, 35*7+32, 6, 6);
    ctx.fillRect(35*3+32, 35*11+32, 6, 6);
    ctx.fillRect(35*11+32, 35*11+32, 6, 6);
  }

  render(pos){
    const board = this.board;
    const ctx = this.ctx;
    const [i,j] = pos;
    const gradient = ctx.createRadialGradient(j*35+35, i*35+35, 12, j*35+30, i*35+30, 20);
    if (board[i][j] === 1) {
      gradient.addColorStop(0, "#fff");
      gradient.addColorStop(1, "#bbb");
    } else {
      gradient.addColorStop(0, "#404040");
      gradient.addColorStop(1, "#0d0d0d");
    }


    ctx.fillStyle = gradient;
    // board[i][j] === 1 ? "white" : "black";
    ctx.beginPath();
    ctx.arc(j*35 + 35, i*35 + 35, 15, 0, 2*Math.PI);
    ctx.closePath();
    ctx.fill();
  }
}
