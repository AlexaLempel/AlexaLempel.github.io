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

//
// function Renderer(game){
// 	this.game = game;
// 	this.canvas = document.getElementById("canvas");
// 	this.ctx = canvas.getContext("2d");
// 	canvas.width = SCREEN_WIDTH;
// 	canvas.height = SCREEN_HEIGHT;
// 	this.minSide = Math.min(this.canvas.width, this.canvas.height);
// 	this.padding = 10;
// 	this.cellSize = (this.minSide - 2 * this.padding) / GRID_SIZE;
// }
