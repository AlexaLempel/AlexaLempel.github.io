export default class Player {
  constructor(name, board){
    this.name = name;
    this.placeStone = this.placeStone.bind(this);
  }

  getMove(board){
    const canvasEl = document.getElementById("canvas");
    canvasEl.addEventListener("mousedown", this.placeStone(board));
    console.log("event listener added!");
  }

  placeStone(board) {
    return e => {
      e.target.removeEventListener(e.type, this.placeStone(board));
      const xPosition = e.clientX;
      const yPosition = e.clientY;
      console.log("in click handler");
      console.log([Math.round(xPosition/35), Math.round(yPosition/35)]);
      const move = [Math.round(xPosition/35), Math.round(yPosition/35)];
      board.placeStone(move);
    };
  }
}
