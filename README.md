# Gomoku

Live Version: https://ixjamesyoo.github.io/Gomoku/

### Background
Gomoku is a simple two-player game played on a 15x15 grid, akin to Connect4 without any notion of verticality. The objective is to connect **exactly** 5 stones of your color in a line. Any open intersection on the game grid is a valid position for your move.

### Functionality & MVP
With this Gomoku browser game, users will be able to:
* play against another human or against the computer
* start/restart the game
* choose between going first (white) or second (black)

Additionally, I plan to flesh out the project with:
* a modal describing the background and rules of the game
* a production readme
* a footer with links to github repo and portfolio site, etc.
* **a computer AI implementation**--the rules of the game are simple making board state evaluation easy, but the degree of branching from a given board state is larger than chess, likely lending itself to some type of best-first search algorithm

### Technologies
This project will be implemented with the following technologies:

* JavaScript for game logic,
* HTML5 Canvas for rendering,
* webpack to bundle js files.

In addition to the entry file, there will be three scripts involved in this project:

* board.js: this script will handle the logic for creating and updating the board element and rendering to the DOM.
* game.js: this script will handle game logic, e.g. ensuring move is valid or checking if game is won.
* computer.js: this script will handle AI for computer player

### Implementation Timeline
Days 1 & 2: creating board element, game logic and polishing front end display

Days 3-5: working on AI implementation
