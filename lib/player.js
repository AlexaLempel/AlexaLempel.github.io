export default class Player {
  constructor(name, board){
    this.name = name;
    // this.handleClick = this.handleClick.bind(this);
  }

  getMove(board){
    const canvasEl = document.getElementById("canvas");
    canvasEl.addEventListener("mousedown", this.placeStone(board));
    console.log("getMove!");
    // console.log(canvasPos);
    // return -1;
  }

  placeStone(board) {
    return e => {
      e.target.removeEventListener(e.type, this.handleClick);
      const xPosition = e.clientX;
      const yPosition = e.clientY;
      console.log("in click handler");
      console.log([Math.round(xPosition/35), Math.round(yPosition/35)]);
      const move = [Math.round(xPosition/35), Math.round(yPosition/35)];
      board.placeStone(move);
    };
  }



  // handleClick(e){
  //   e.target.removeEventListener(e.type, this.handleClick);
  //   const xPosition = e.clientX;
  //   const yPosition = e.clientY;
  //   console.log("in click handler");
  //   console.log([Math.round(xPosition/35), Math.round(yPosition/35)]);
  //   const move = [Math.round(xPosition/35), Math.round(yPosition/35)];
  //   board.placeStone(move);
  //   // return [Math.round(xPosition/35), Math.round(yPosition/35)];
  // }
}
