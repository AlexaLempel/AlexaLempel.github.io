import Game from "./game";

export default class Display {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.render();
  }

  render(){
    const canvasEl = document.getElementById("canvas");
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
  }
}
