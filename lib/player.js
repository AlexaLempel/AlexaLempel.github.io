export default class Player {
  constructor(name){
    this.name = name;
    this.handleClick = this.handleClick.bind(this);
  }

  getMove(board){
    const canvasEl = document.getElementById("canvas");
    const canvasPos = canvasEl.addEventListener("mousedown", this.handleClick);
    return canvasPos;
    // need to divide by cell size
  }

  handleClick(e){
    e.target.removeEventListener(e.type, this.handleClick);
    const xPosition = e.clientX;
    const yPosition = e.clientY;
    console.log([xPosition/35, yPosition/35]);
    return [xPosition/35, yPosition/35];
  }
}
