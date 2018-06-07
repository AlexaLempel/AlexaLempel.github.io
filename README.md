# Gomoku

Live Version: https://ixjamesyoo.github.io/Gomoku/

### Background
Gomoku is a simple two-player game played on a 15x15 grid, akin to Connect4 without any notion of verticality. The objective is to connect 5 stones of your color in a line--horizontally, vertically or diagonally. Any open intersection on the game grid is a valid position for your move.

### Design and Implementation

The game was written using vanilla JavaScript and HTML5 Canvas. The AI was implemented using a minimax algorithm with alpha-beta pruning. Search space reduction based upon domain-specific knowledge.

``` javascript
minimax(grid, currentDepth, targetDepth, isMaximizingPlayer, alpha, beta, possibleMoves, cpuColor) {
  if (currentDepth === targetDepth || this.terminalState(grid)) {
    const gridHash = this.hashFunction(grid);
    if (this.minimaxCache[gridHash]){
      return this.minimaxCache[gridHash];
    } else {
      let value = this.evaluate(grid, cpuColor);
      this.minimaxCache[gridHash] = value;
      return value;
    }
  }

  const currentColor = currentDepth % 2 === 0 ? 2 : 1;
  if (isMaximizingPlayer) {
    let bestVal = Number.NEGATIVE_INFINITY;

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        if (possibleMoves[i][j] && !grid[i][j]) {
          grid[i][j] = currentColor;
          const gridHash = this.hashFunction(grid);
          let value;
          if (this.minimaxCache[gridHash]) {
            value = this.minimaxCache[gridHash];
          } else {
            const newMoves = this.nearbyMoves(grid);
            value = this.minimax(grid, currentDepth+1, targetDepth, false, alpha, beta, newMoves, cpuColor);
            this.minimaxCache[gridHash] = value;
          }
          grid[i][j] = 0;
          bestVal = Math.max(bestVal, value);
          alpha = Math.max(alpha, bestVal);
          if (beta <= alpha) break;
        }
      }
    }
    return bestVal;
  } else {
    let bestVal= Number.POSITIVE_INFINITY;

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        if (possibleMoves[i][j] && !grid[i][j]) {
          grid[i][j] = currentColor;
          const gridHash = this.hashFunction(grid);
          let value;
          if (this.minimaxCache[gridHash]) {
            value = this.minimaxCache[gridHash];
          } else {
            const newMoves = this.nearbyMoves(grid);
            value = this.minimax(grid, currentDepth+1, targetDepth, true, alpha, beta, newMoves, cpuColor);
            this.minimaxCache[gridHash] = value;
          }
          grid[i][j] = 0;
          bestVal = Math.min(bestVal, value);
          beta = Math.min(beta, bestVal);
          if (beta <= alpha) break;
        }
      }
    }
    return bestVal;
  }
}
```


### Future Directions
* Improvements to AI to allow greater search depth. Alpha-beta pruning is far more effective when the possible moves are ordered by some heuristic. Implement a negascout algorithm, which dominates alpha-beta pruning.
* Iterative deepening to allow computer to return move choice in a timely fashion.
* Async "thinking" for AI to increase search depth while human player considers his/her own move.
