export default class Display {
  constructor(board, ctx) {
    this.board = board;
    this.ctx = ctx;
    this.drawBoard();
    this.blue = document.getElementById('blue');
    this.green = document.getElementById('green');
  }

  drawBoard(){
    const canvasEl = document.getElementById("canvas");
    const ctx = this.ctx;
    ctx.fillStyle= "#999999";
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

    var gradient = ctx.createLinearGradient(0, 0, 384, 141);
    gradient.addColorStop(0, "rgba(25, 224, 143, 0.5)");
    gradient.addColorStop(0.2777777777777778, "rgba(12, 167, 173, 0.71)");
    gradient.addColorStop(0.5, "rgba(12, 167, 173, 0.87)");
    gradient.addColorStop(0.8484848484848485, "rgba(12, 167, 173, 0.62)");
    gradient.addColorStop(1, "rgba(27, 208, 194, 0.51)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

    for (let i = 0; i <= 14; i++) {
      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.moveTo(i*35 + 35.5,0 + 35.5);
      ctx.lineTo(i*35 + 35.5, 35*15);
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.moveTo(0 + 35.5, i*35 + 35.5);
      ctx.lineTo(35*15, i*35 + 35.5);
      ctx.stroke();
      ctx.closePath();
    }
    ctx.fillStyle = "white";
    ctx.fillRect(35*3+32, 35*3+32, 6, 6);
    ctx.fillRect(35*11+32, 35*3+32, 6, 6);
    ctx.fillRect(35*7+32, 35*7+32, 6, 6);
    ctx.fillRect(35*3+32, 35*11+32, 6, 6);
    ctx.fillRect(35*11+32, 35*11+32, 6, 6);
  }

  renderPos(pos){
    const board = this.board;
    const ctx = this.ctx;
    const [i,j] = pos;
    
    this.drawPiece(ctx, i, j, board[i][j]);
  }

  renderJumps(gameBoard){
    var whiteJumps = gameBoard.jumpCounts[1];
    var blackJumps = gameBoard.jumpCounts[0];

    for (var i = 0; i < whiteJumps; i++){
      const ctx = document.getElementById("blackJumps").getContext("2d");
      // this.drawPiece(ctx, i*3, 0, "#fff", "#bbb");
      // this.drawPiece(ctx, i*3 + 1, 0, "#fff", "#bbb");
      this.drawPiece(ctx, i*3, 0, 1);
      this.drawPiece(ctx, i*3 + 1, 0, 1);
    }

    for (var i = 0; i < blackJumps; i++){
      const ctx = document.getElementById("whiteJumps").getContext("2d");
      this.drawPiece(ctx, i*3, 0, 2);
      this.drawPiece(ctx, i*3 + 1, 0, 2)
    }
  }
  
  drawPiece(ctx, i, j, color1, color2){
    const gradient = ctx.createRadialGradient(j*35+35, i*35+35, 12, j*35+30, i*35+30, 20);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(j*35 + 35, i*35 + 35, 15, 0, 2*Math.PI);
    ctx.closePath();
    ctx.fill();
  }

  drawPiece(ctx, i, j, color){
    if (color == 0) return;
    const image = color == 1 ? blue : green;
    ctx.globalAlpha = 0.95;
    ctx.drawImage(image, j*35 + 18, i*35 + 18, 35, 35);
    ctx.restore();
  }

  render(gameBoard){
    this.board = gameBoard.grid;
    for (let i = 0; i < gameBoard.gridSize; i++) {
      for (let j = 0; j < gameBoard.gridSize; j++) {
        this.renderPos([i,j])
      }
    }
    this.renderJumps(gameBoard);
  }
}
