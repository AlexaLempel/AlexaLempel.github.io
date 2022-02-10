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
    
    if (board[i][j] === 0) {
      return;
    }
    if (board[i][j] === 1) {
      this.drawPiece(ctx, i, j, "#fff", "#bbb");
    } else {
      this.drawPiece(ctx, i, j, "#404040", "#0d0d0d");
    }
  }

  renderJumps(gameBoard){
    var whiteJumps = gameBoard.jumpCounts[1];
    var blackJumps = gameBoard.jumpCounts[0];

    for (var i = 0; i < whiteJumps; i++){
      const ctx = document.getElementById("blackJumps").getContext("2d");
      this.drawPiece(ctx, i*3, 0, "#fff", "#bbb");
      this.drawPiece(ctx, i*3 + 1, 0, "#fff", "#bbb");
    }

    for (var i = 0; i < blackJumps; i++){
      const ctx = document.getElementById("whiteJumps").getContext("2d");
      this.drawPiece(ctx, i*3, 0, "#404040", "#0d0d0d");
      this.drawPiece(ctx, i*3 + 1, 0, "#404040", "#0d0d0d");
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
