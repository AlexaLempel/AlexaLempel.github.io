import "browserify-zlib";

const WHITE = "white";
const BLACK = "black";
const zlib = require('browserify-zlib');

export default class Code {
    constructor(board){
        this.p = this.positions(board);
        this.t = board.color === WHITE ? 1 : 2;
        this.j = board.jumpCounts;
        this.l = board.lastPos;
    }

    positions(board) {
        const gridSize = board.gridSize;
        let table = [[],[]];
       
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                let piece = board.grid[i][j];
                if (piece != 0) {
                   table[piece - 1].push([[i,j]]);
                }
            }
        }

        return table;
    }

    restorePositions(grid) {
        
        for (var c = 0; c < 2; c++) {
            for (var i = 0; i < this.p[c].length; i++) {
                var [coord] = this.p[c][i];
                if(typeof coord !== 'undefined') {
                    grid[coord[0]][coord[1]] = c + 1;
                }
            }
        }
    }

    encode(){
        let str = JSON.stringify(this);
        let deflate = zlib.deflateSync(str).toString('hex');
        
        return deflate;
    }

    decode(str, board){
        const packed = Buffer.from(str, 'hex');
        let inflate = zlib.inflateSync(packed).toString();
        let code = JSON.parse(inflate);
        this.p = code.p;
        this.t = code.t;
        this.j = code.j;
        this.l = code.l;
        board.color = this.t == 1 ? WHITE : BLACK;
        board.jumpCounts = this.j;
        board.lastPos = this.l;
        this.restorePositions(board.grid);

        return board;
    }
}