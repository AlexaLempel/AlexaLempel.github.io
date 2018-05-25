// export default class Minimax {
//   constructor(grid, currentDepth, targetDepth, isMaximizingPlayer, alpha, beta) {
//     thi
//   }
//
//
// }


//
// minimax(grid, currentDepth, targetDepth, isMaximizingPlayer, alpha, beta) {
//   // also need to check if its a terminal state!!!!!!!
//
//   if (currentDepth === targetDepth) {
//     return this.evaluate(grid);
//   }
//
//   const gridClone = cloneDeep(grid);
//   // currentDepth relies on stoneCount
//   // black goes first, its placeholder is "2"
//   const color = currentDepth % 2 === 0 ? 2 : 1;
//   const childNodes = this.childBoardStates(gridClone, color);
//
//   if (isMaximizingPlayer) {
//     let bestVal = -10000000;
//
//     for (let i = 0; i < childNodes.length; i++) {
//       const value = this.minimax(childNodes[i], currentDepth+1, targetDepth, false, alpha, beta);
//       bestVal = Math.max(bestVal, value);
//       alpha = Math.max(alpha, bestVal);
//       if (beta <= alpha) break;
//     }
//     return bestVal;
//   } else {
//     let bestVal = 10000000;
//     for (let i = 0; i < childNodes.length; i++) {
//       const value = this.minimax(childNodes[i], currentDepth+1, targetDepth, true, alpha, beta);
//       bestVal = Math.min(bestVal, value);
//       beta = Math.min(beta, bestVal);
//       if (beta <= alpha) break;
//     }
//     return bestVal;
//   }
// }
//
// possibleMoves(grid){
//   let moves = [];
//
//   for (let i = 0; i < grid.length; i++) {
//     for (let j = 0; j < grid.length; j++) {
//       if (grid[i][j] === 0) {
//         moves.push([i,j]);
//       }
//     }
//   }
//   return moves;
// }
//
// childBoardStates(grid, color) {
//   const grids = [];
//
//   this.possibleMoves(grid).forEach( move => {
//     const [i,j] = move;
//     const gridClone = cloneDeep(grid);
//     gridClone[i][j] = color;
//     grids.push(gridClone);
//   });
//
//   return grids;
// }
//
// evaluate(grid){
//   return (Math.random() * 1000);
// }
