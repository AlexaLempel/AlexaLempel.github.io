/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _board = __webpack_require__(/*! ./lib/board */ \"./lib/board.js\");\n\nvar _board2 = _interopRequireDefault(_board);\n\nvar _game = __webpack_require__(/*! ./lib/game */ \"./lib/game.js\");\n\nvar _game2 = _interopRequireDefault(_game);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nwindow.game = new _game2.default();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9pbmRleC5qcz80MWY1Il0sIm5hbWVzIjpbIndpbmRvdyIsImdhbWUiLCJHYW1lIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVBQSxPQUFPQyxJQUFQLEdBQWMsSUFBSUMsY0FBSixFQUFkIiwiZmlsZSI6Ii4vaW5kZXguanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQm9hcmQgZnJvbSBcIi4vbGliL2JvYXJkXCI7XG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9saWIvZ2FtZVwiO1xuXG53aW5kb3cuZ2FtZSA9IG5ldyBHYW1lKCk7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./index.js\n");

/***/ }),

/***/ "./lib/board.js":
/*!**********************!*\
  !*** ./lib/board.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar WHITE = \"white\";\nvar BLACK = \"black\";\n\nvar Board = function () {\n  function Board(gridSize, winningSequence) {\n    _classCallCheck(this, Board);\n\n    this.gridSize = gridSize;\n    this.winningSequence = winningSequence;\n    this.color = WHITE;\n    this.grid = this.buildGrid(this.gridSize);\n    this.lastPos = null;\n  }\n\n  _createClass(Board, [{\n    key: \"buildGrid\",\n    value: function buildGrid(size) {\n      var grid = [];\n      for (var i = 0; i < size; i++) {\n        var row = [];\n\n        for (var j = 0; j < size; j++) {\n          row.push(0);\n        }\n\n        grid.push(row);\n      }\n      return grid;\n    }\n  }, {\n    key: \"placeStone\",\n    value: function placeStone(pos) {\n      var _pos = _slicedToArray(pos, 2),\n          row = _pos[0],\n          col = _pos[1];\n\n      this.grid[row][col] = this.color === WHITE ? 1 : 2;\n      this.lastPos = pos;\n    }\n    // default is 0,\n    // white is 1,\n    // black is 2\n\n  }, {\n    key: \"switchColor\",\n    value: function switchColor() {\n      this.color = this.color === WHITE ? BLACK : WHITE;\n    }\n  }, {\n    key: \"checkForWinner\",\n    value: function checkForWinner() {\n      if (this.rowWinner()) return true;\n      if (this.columnWinner()) return true;\n      if (this.upDiagWinner()) return true;\n      if (this.downDiagWinner()) return true;\n      return false;\n    }\n  }, {\n    key: \"rowWinner\",\n    value: function rowWinner() {\n      var pieceRow = this.lastPos[0];\n      var pieceCol = this.lastPos[1];\n      var pieceNum = this.grid[pieceRow][pieceCol];\n\n      var counter = 0;\n\n      for (var col = pieceCol - 4; col <= pieceCol + 4; col++) {\n        if (col < 0) continue;\n        if (col >= this.gridSize) break;\n\n        if (this.grid[pieceRow][col] === pieceNum) {\n          counter += 1;\n        } else {\n          counter = 0;\n        }\n\n        if (counter === this.winningSequence) return true;\n      }\n    }\n  }, {\n    key: \"columnWinner\",\n    value: function columnWinner() {\n      var pieceRow = this.lastPos[0];\n      var pieceCol = this.lastPos[1];\n      var pieceNum = this.grid[pieceRow][pieceCol];\n\n      var counter = 0;\n\n      for (var row = pieceRow - 4; row <= pieceRow + 4; row++) {\n        if (row < 0) continue;\n        if (row >= this.gridSize) break;\n\n        if (this.grid[row][pieceCol] === pieceNum) {\n          counter += 1;\n        } else {\n          counter = 0;\n        }\n\n        if (counter === this.winningSequence) return true;\n      }\n    }\n  }, {\n    key: \"upDiagWinner\",\n    value: function upDiagWinner() {\n      var pieceRow = this.lastPos[0];\n      var pieceCol = this.lastPos[1];\n      var pieceNum = this.grid[pieceRow][pieceCol];\n\n      var counter = 0;\n\n      for (var offset = -4; offset <= 4; offset++) {\n        var checkRow = pieceRow - offset;\n        var checkCol = pieceCol + offset;\n\n        if (checkRow >= this.gridSize || checkCol < 0) continue;\n        if (checkRow < 0 || checkCol >= this.gridSize) break;\n\n        if (this.grid[checkRow][checkCol] === pieceNum) {\n          counter += 1;\n        } else {\n          counter = 0;\n        }\n\n        if (counter === this.winningSequence) return true;\n      }\n    }\n  }, {\n    key: \"downDiagWinner\",\n    value: function downDiagWinner() {\n      var pieceRow = this.lastPos[0];\n      var pieceCol = this.lastPos[1];\n      var pieceNum = this.grid[pieceRow][pieceCol];\n\n      var counter = 0;\n\n      for (var offset = -4; offset <= 4; offset++) {\n        var checkRow = pieceRow + offset;\n        var checkCol = pieceCol + offset;\n\n        if (checkRow >= this.gridSize || checkCol >= this.gridSize) break;\n        if (checkRow < 0 || checkCol < 0) continue;\n\n        if (this.grid[checkRow][checkCol] === pieceNum) {\n          counter += 1;\n        } else {\n          counter = 0;\n        }\n\n        if (counter === this.winningSequence) return true;\n      }\n    }\n  }]);\n\n  return Board;\n}();\n\nexports.default = Board;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9saWIvYm9hcmQuanM/Y2RmOCJdLCJuYW1lcyI6WyJXSElURSIsIkJMQUNLIiwiQm9hcmQiLCJncmlkU2l6ZSIsIndpbm5pbmdTZXF1ZW5jZSIsImNvbG9yIiwiZ3JpZCIsImJ1aWxkR3JpZCIsImxhc3RQb3MiLCJzaXplIiwiaSIsInJvdyIsImoiLCJwdXNoIiwicG9zIiwiY29sIiwicm93V2lubmVyIiwiY29sdW1uV2lubmVyIiwidXBEaWFnV2lubmVyIiwiZG93bkRpYWdXaW5uZXIiLCJwaWVjZVJvdyIsInBpZWNlQ29sIiwicGllY2VOdW0iLCJjb3VudGVyIiwib2Zmc2V0IiwiY2hlY2tSb3ciLCJjaGVja0NvbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsUUFBUSxPQUFkO0FBQ0EsSUFBTUMsUUFBUSxPQUFkOztJQUVxQkMsSztBQUNuQixpQkFBWUMsUUFBWixFQUFzQkMsZUFBdEIsRUFBdUM7QUFBQTs7QUFDckMsU0FBS0QsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLQyxlQUFMLEdBQXVCQSxlQUF2QjtBQUNBLFNBQUtDLEtBQUwsR0FBYUwsS0FBYjtBQUNBLFNBQUtNLElBQUwsR0FBWSxLQUFLQyxTQUFMLENBQWUsS0FBS0osUUFBcEIsQ0FBWjtBQUNBLFNBQUtLLE9BQUwsR0FBZSxJQUFmO0FBQ0Q7Ozs7OEJBRVNDLEksRUFBSztBQUNiLFVBQUlILE9BQU8sRUFBWDtBQUNBLFdBQUssSUFBSUksSUFBSSxDQUFiLEVBQWdCQSxJQUFJRCxJQUFwQixFQUEwQkMsR0FBMUIsRUFBK0I7QUFDN0IsWUFBSUMsTUFBTSxFQUFWOztBQUVBLGFBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJSCxJQUFwQixFQUEwQkcsR0FBMUIsRUFBK0I7QUFDN0JELGNBQUlFLElBQUosQ0FBUyxDQUFUO0FBQ0Q7O0FBRURQLGFBQUtPLElBQUwsQ0FBVUYsR0FBVjtBQUNEO0FBQ0QsYUFBT0wsSUFBUDtBQUNEOzs7K0JBRVVRLEcsRUFBSztBQUFBLGdDQUNLQSxHQURMO0FBQUEsVUFDUEgsR0FETztBQUFBLFVBQ0ZJLEdBREU7O0FBRWQsV0FBS1QsSUFBTCxDQUFVSyxHQUFWLEVBQWVJLEdBQWYsSUFBc0IsS0FBS1YsS0FBTCxLQUFlTCxLQUFmLEdBQXVCLENBQXZCLEdBQTJCLENBQWpEO0FBQ0EsV0FBS1EsT0FBTCxHQUFlTSxHQUFmO0FBQ0Q7QUFDRDtBQUNBO0FBQ0E7Ozs7a0NBRWE7QUFDWCxXQUFLVCxLQUFMLEdBQWEsS0FBS0EsS0FBTCxLQUFlTCxLQUFmLEdBQXVCQyxLQUF2QixHQUErQkQsS0FBNUM7QUFDRDs7O3FDQUdnQjtBQUNmLFVBQUksS0FBS2dCLFNBQUwsRUFBSixFQUFzQixPQUFPLElBQVA7QUFDdEIsVUFBSSxLQUFLQyxZQUFMLEVBQUosRUFBeUIsT0FBTyxJQUFQO0FBQ3pCLFVBQUksS0FBS0MsWUFBTCxFQUFKLEVBQXlCLE9BQU8sSUFBUDtBQUN6QixVQUFJLEtBQUtDLGNBQUwsRUFBSixFQUEyQixPQUFPLElBQVA7QUFDM0IsYUFBTyxLQUFQO0FBQ0Q7OztnQ0FFVztBQUNWLFVBQU1DLFdBQVcsS0FBS1osT0FBTCxDQUFhLENBQWIsQ0FBakI7QUFDQSxVQUFNYSxXQUFXLEtBQUtiLE9BQUwsQ0FBYSxDQUFiLENBQWpCO0FBQ0EsVUFBTWMsV0FBVyxLQUFLaEIsSUFBTCxDQUFVYyxRQUFWLEVBQW9CQyxRQUFwQixDQUFqQjs7QUFFQSxVQUFJRSxVQUFVLENBQWQ7O0FBRUEsV0FBSyxJQUFJUixNQUFNTSxXQUFTLENBQXhCLEVBQTJCTixPQUFPTSxXQUFTLENBQTNDLEVBQThDTixLQUE5QyxFQUFxRDtBQUNuRCxZQUFJQSxNQUFNLENBQVYsRUFBYTtBQUNiLFlBQUlBLE9BQU8sS0FBS1osUUFBaEIsRUFBMEI7O0FBRTFCLFlBQUksS0FBS0csSUFBTCxDQUFVYyxRQUFWLEVBQW9CTCxHQUFwQixNQUE2Qk8sUUFBakMsRUFBMkM7QUFDekNDLHFCQUFXLENBQVg7QUFDRCxTQUZELE1BRU87QUFDTEEsb0JBQVUsQ0FBVjtBQUNEOztBQUVELFlBQUlBLFlBQVksS0FBS25CLGVBQXJCLEVBQXNDLE9BQU8sSUFBUDtBQUN2QztBQUNGOzs7bUNBRWM7QUFDYixVQUFNZ0IsV0FBVyxLQUFLWixPQUFMLENBQWEsQ0FBYixDQUFqQjtBQUNBLFVBQU1hLFdBQVcsS0FBS2IsT0FBTCxDQUFhLENBQWIsQ0FBakI7QUFDQSxVQUFNYyxXQUFXLEtBQUtoQixJQUFMLENBQVVjLFFBQVYsRUFBb0JDLFFBQXBCLENBQWpCOztBQUVBLFVBQUlFLFVBQVUsQ0FBZDs7QUFFQSxXQUFLLElBQUlaLE1BQU1TLFdBQVMsQ0FBeEIsRUFBMkJULE9BQU9TLFdBQVMsQ0FBM0MsRUFBOENULEtBQTlDLEVBQXFEO0FBQ25ELFlBQUlBLE1BQU0sQ0FBVixFQUFhO0FBQ2IsWUFBSUEsT0FBTyxLQUFLUixRQUFoQixFQUEwQjs7QUFFMUIsWUFBSSxLQUFLRyxJQUFMLENBQVVLLEdBQVYsRUFBZVUsUUFBZixNQUE2QkMsUUFBakMsRUFBMkM7QUFDekNDLHFCQUFXLENBQVg7QUFDRCxTQUZELE1BRU87QUFDTEEsb0JBQVUsQ0FBVjtBQUNEOztBQUVELFlBQUlBLFlBQVksS0FBS25CLGVBQXJCLEVBQXNDLE9BQU8sSUFBUDtBQUN2QztBQUNGOzs7bUNBRWM7QUFDYixVQUFNZ0IsV0FBVyxLQUFLWixPQUFMLENBQWEsQ0FBYixDQUFqQjtBQUNBLFVBQU1hLFdBQVcsS0FBS2IsT0FBTCxDQUFhLENBQWIsQ0FBakI7QUFDQSxVQUFNYyxXQUFXLEtBQUtoQixJQUFMLENBQVVjLFFBQVYsRUFBb0JDLFFBQXBCLENBQWpCOztBQUVBLFVBQUlFLFVBQVUsQ0FBZDs7QUFFQSxXQUFLLElBQUlDLFNBQVMsQ0FBQyxDQUFuQixFQUFzQkEsVUFBVSxDQUFoQyxFQUFtQ0EsUUFBbkMsRUFBNkM7QUFDM0MsWUFBTUMsV0FBV0wsV0FBV0ksTUFBNUI7QUFDQSxZQUFNRSxXQUFXTCxXQUFXRyxNQUE1Qjs7QUFFQSxZQUFJQyxZQUFZLEtBQUt0QixRQUFqQixJQUE2QnVCLFdBQVcsQ0FBNUMsRUFBK0M7QUFDL0MsWUFBSUQsV0FBVyxDQUFYLElBQWdCQyxZQUFZLEtBQUt2QixRQUFyQyxFQUErQzs7QUFFL0MsWUFBSSxLQUFLRyxJQUFMLENBQVVtQixRQUFWLEVBQW9CQyxRQUFwQixNQUFrQ0osUUFBdEMsRUFBZ0Q7QUFDOUNDLHFCQUFXLENBQVg7QUFDRCxTQUZELE1BRU87QUFDTEEsb0JBQVUsQ0FBVjtBQUNEOztBQUVELFlBQUlBLFlBQVksS0FBS25CLGVBQXJCLEVBQXNDLE9BQU8sSUFBUDtBQUN2QztBQUNGOzs7cUNBRWdCO0FBQ2YsVUFBTWdCLFdBQVcsS0FBS1osT0FBTCxDQUFhLENBQWIsQ0FBakI7QUFDQSxVQUFNYSxXQUFXLEtBQUtiLE9BQUwsQ0FBYSxDQUFiLENBQWpCO0FBQ0EsVUFBTWMsV0FBVyxLQUFLaEIsSUFBTCxDQUFVYyxRQUFWLEVBQW9CQyxRQUFwQixDQUFqQjs7QUFFQSxVQUFJRSxVQUFVLENBQWQ7O0FBRUEsV0FBSyxJQUFJQyxTQUFTLENBQUMsQ0FBbkIsRUFBc0JBLFVBQVUsQ0FBaEMsRUFBbUNBLFFBQW5DLEVBQTZDO0FBQzNDLFlBQU1DLFdBQVdMLFdBQVdJLE1BQTVCO0FBQ0EsWUFBTUUsV0FBV0wsV0FBV0csTUFBNUI7O0FBRUEsWUFBSUMsWUFBWSxLQUFLdEIsUUFBakIsSUFBNkJ1QixZQUFZLEtBQUt2QixRQUFsRCxFQUE0RDtBQUM1RCxZQUFJc0IsV0FBVyxDQUFYLElBQWdCQyxXQUFXLENBQS9CLEVBQWtDOztBQUVsQyxZQUFJLEtBQUtwQixJQUFMLENBQVVtQixRQUFWLEVBQW9CQyxRQUFwQixNQUFrQ0osUUFBdEMsRUFBZ0Q7QUFDOUNDLHFCQUFXLENBQVg7QUFDRCxTQUZELE1BRU87QUFDTEEsb0JBQVUsQ0FBVjtBQUNEOztBQUVELFlBQUlBLFlBQVksS0FBS25CLGVBQXJCLEVBQXNDLE9BQU8sSUFBUDtBQUN2QztBQUNGOzs7Ozs7a0JBcklrQkYsSyIsImZpbGUiOiIuL2xpYi9ib2FyZC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFdISVRFID0gXCJ3aGl0ZVwiO1xuY29uc3QgQkxBQ0sgPSBcImJsYWNrXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJkIHtcbiAgY29uc3RydWN0b3IoZ3JpZFNpemUsIHdpbm5pbmdTZXF1ZW5jZSkge1xuICAgIHRoaXMuZ3JpZFNpemUgPSBncmlkU2l6ZTtcbiAgICB0aGlzLndpbm5pbmdTZXF1ZW5jZSA9IHdpbm5pbmdTZXF1ZW5jZTtcbiAgICB0aGlzLmNvbG9yID0gV0hJVEU7XG4gICAgdGhpcy5ncmlkID0gdGhpcy5idWlsZEdyaWQodGhpcy5ncmlkU2l6ZSk7XG4gICAgdGhpcy5sYXN0UG9zID0gbnVsbDtcbiAgfVxuXG4gIGJ1aWxkR3JpZChzaXplKXtcbiAgICBsZXQgZ3JpZCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICBsZXQgcm93ID0gW107XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2l6ZTsgaisrKSB7XG4gICAgICAgIHJvdy5wdXNoKDApO1xuICAgICAgfVxuXG4gICAgICBncmlkLnB1c2gocm93KTtcbiAgICB9XG4gICAgcmV0dXJuIGdyaWQ7XG4gIH1cblxuICBwbGFjZVN0b25lKHBvcykge1xuICAgIGNvbnN0IFtyb3csIGNvbF0gPSBwb3M7XG4gICAgdGhpcy5ncmlkW3Jvd11bY29sXSA9IHRoaXMuY29sb3IgPT09IFdISVRFID8gMSA6IDI7XG4gICAgdGhpcy5sYXN0UG9zID0gcG9zO1xuICB9XG4gIC8vIGRlZmF1bHQgaXMgMCxcbiAgLy8gd2hpdGUgaXMgMSxcbiAgLy8gYmxhY2sgaXMgMlxuXG4gIHN3aXRjaENvbG9yKCl7XG4gICAgdGhpcy5jb2xvciA9IHRoaXMuY29sb3IgPT09IFdISVRFID8gQkxBQ0sgOiBXSElURTtcbiAgfVxuXG5cbiAgY2hlY2tGb3JXaW5uZXIoKSB7XG4gICAgaWYgKHRoaXMucm93V2lubmVyKCkpIHJldHVybiB0cnVlO1xuICAgIGlmICh0aGlzLmNvbHVtbldpbm5lcigpKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAodGhpcy51cERpYWdXaW5uZXIoKSkgcmV0dXJuIHRydWU7XG4gICAgaWYgKHRoaXMuZG93bkRpYWdXaW5uZXIoKSkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcm93V2lubmVyKCkge1xuICAgIGNvbnN0IHBpZWNlUm93ID0gdGhpcy5sYXN0UG9zWzBdO1xuICAgIGNvbnN0IHBpZWNlQ29sID0gdGhpcy5sYXN0UG9zWzFdO1xuICAgIGNvbnN0IHBpZWNlTnVtID0gdGhpcy5ncmlkW3BpZWNlUm93XVtwaWVjZUNvbF07XG5cbiAgICBsZXQgY291bnRlciA9IDA7XG5cbiAgICBmb3IgKGxldCBjb2wgPSBwaWVjZUNvbC00OyBjb2wgPD0gcGllY2VDb2wrNDsgY29sKyspIHtcbiAgICAgIGlmIChjb2wgPCAwKSBjb250aW51ZTtcbiAgICAgIGlmIChjb2wgPj0gdGhpcy5ncmlkU2l6ZSkgYnJlYWs7XG5cbiAgICAgIGlmICh0aGlzLmdyaWRbcGllY2VSb3ddW2NvbF0gPT09IHBpZWNlTnVtKSB7XG4gICAgICAgIGNvdW50ZXIgKz0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvdW50ZXIgPSAwO1xuICAgICAgfVxuXG4gICAgICBpZiAoY291bnRlciA9PT0gdGhpcy53aW5uaW5nU2VxdWVuY2UpIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGNvbHVtbldpbm5lcigpIHtcbiAgICBjb25zdCBwaWVjZVJvdyA9IHRoaXMubGFzdFBvc1swXTtcbiAgICBjb25zdCBwaWVjZUNvbCA9IHRoaXMubGFzdFBvc1sxXTtcbiAgICBjb25zdCBwaWVjZU51bSA9IHRoaXMuZ3JpZFtwaWVjZVJvd11bcGllY2VDb2xdO1xuXG4gICAgbGV0IGNvdW50ZXIgPSAwO1xuXG4gICAgZm9yIChsZXQgcm93ID0gcGllY2VSb3ctNDsgcm93IDw9IHBpZWNlUm93KzQ7IHJvdysrKSB7XG4gICAgICBpZiAocm93IDwgMCkgY29udGludWU7XG4gICAgICBpZiAocm93ID49IHRoaXMuZ3JpZFNpemUpIGJyZWFrO1xuXG4gICAgICBpZiAodGhpcy5ncmlkW3Jvd11bcGllY2VDb2xdID09PSBwaWVjZU51bSkge1xuICAgICAgICBjb3VudGVyICs9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb3VudGVyID0gMDtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvdW50ZXIgPT09IHRoaXMud2lubmluZ1NlcXVlbmNlKSByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICB1cERpYWdXaW5uZXIoKSB7XG4gICAgY29uc3QgcGllY2VSb3cgPSB0aGlzLmxhc3RQb3NbMF07XG4gICAgY29uc3QgcGllY2VDb2wgPSB0aGlzLmxhc3RQb3NbMV07XG4gICAgY29uc3QgcGllY2VOdW0gPSB0aGlzLmdyaWRbcGllY2VSb3ddW3BpZWNlQ29sXTtcblxuICAgIGxldCBjb3VudGVyID0gMDtcblxuICAgIGZvciAobGV0IG9mZnNldCA9IC00OyBvZmZzZXQgPD0gNDsgb2Zmc2V0KyspIHtcbiAgICAgIGNvbnN0IGNoZWNrUm93ID0gcGllY2VSb3cgLSBvZmZzZXQ7XG4gICAgICBjb25zdCBjaGVja0NvbCA9IHBpZWNlQ29sICsgb2Zmc2V0O1xuXG4gICAgICBpZiAoY2hlY2tSb3cgPj0gdGhpcy5ncmlkU2l6ZSB8fCBjaGVja0NvbCA8IDApIGNvbnRpbnVlO1xuICAgICAgaWYgKGNoZWNrUm93IDwgMCB8fCBjaGVja0NvbCA+PSB0aGlzLmdyaWRTaXplKSBicmVhaztcblxuICAgICAgaWYgKHRoaXMuZ3JpZFtjaGVja1Jvd11bY2hlY2tDb2xdID09PSBwaWVjZU51bSkge1xuICAgICAgICBjb3VudGVyICs9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb3VudGVyID0gMDtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvdW50ZXIgPT09IHRoaXMud2lubmluZ1NlcXVlbmNlKSByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBkb3duRGlhZ1dpbm5lcigpIHtcbiAgICBjb25zdCBwaWVjZVJvdyA9IHRoaXMubGFzdFBvc1swXTtcbiAgICBjb25zdCBwaWVjZUNvbCA9IHRoaXMubGFzdFBvc1sxXTtcbiAgICBjb25zdCBwaWVjZU51bSA9IHRoaXMuZ3JpZFtwaWVjZVJvd11bcGllY2VDb2xdO1xuXG4gICAgbGV0IGNvdW50ZXIgPSAwO1xuXG4gICAgZm9yIChsZXQgb2Zmc2V0ID0gLTQ7IG9mZnNldCA8PSA0OyBvZmZzZXQrKykge1xuICAgICAgY29uc3QgY2hlY2tSb3cgPSBwaWVjZVJvdyArIG9mZnNldDtcbiAgICAgIGNvbnN0IGNoZWNrQ29sID0gcGllY2VDb2wgKyBvZmZzZXQ7XG5cbiAgICAgIGlmIChjaGVja1JvdyA+PSB0aGlzLmdyaWRTaXplIHx8IGNoZWNrQ29sID49IHRoaXMuZ3JpZFNpemUpIGJyZWFrO1xuICAgICAgaWYgKGNoZWNrUm93IDwgMCB8fCBjaGVja0NvbCA8IDApIGNvbnRpbnVlO1xuXG4gICAgICBpZiAodGhpcy5ncmlkW2NoZWNrUm93XVtjaGVja0NvbF0gPT09IHBpZWNlTnVtKSB7XG4gICAgICAgIGNvdW50ZXIgKz0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvdW50ZXIgPSAwO1xuICAgICAgfVxuXG4gICAgICBpZiAoY291bnRlciA9PT0gdGhpcy53aW5uaW5nU2VxdWVuY2UpIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./lib/board.js\n");

/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _board = __webpack_require__(/*! ./board */ \"./lib/board.js\");\n\nvar _board2 = _interopRequireDefault(_board);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar GRID_SIZE = 15;\nvar WINNING_SEQUENCE = 5;\nvar PLAYER1 = \"PLAYER1\";\nvar PLAYER2 = \"PLAYER2\";\n\nvar Game = function () {\n  function Game(player1, player2) {\n    var board = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new _board2.default(GRID_SIZE, WINNING_SEQUENCE);\n\n    _classCallCheck(this, Game);\n\n    this.player1 = player1;\n    this.player2 = player2;\n    this.board = board;\n    this.currentPlayer = PLAYER1;\n  }\n\n  _createClass(Game, [{\n    key: \"playTurn\",\n    value: function playTurn() {\n      var move = void 0;\n      if (this.currentPlayer === PLAYER1) {\n        move = this.player1.getMove();\n      } else {\n        move = this.player2.getMove();\n      }\n      this.board.placeStone(move);\n    }\n  }, {\n    key: \"switchPlayer\",\n    value: function switchPlayer() {\n      this.board.switchColor();\n      this.currentPlayer = this.currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1;\n    }\n  }, {\n    key: \"play\",\n    value: function play() {\n      while (true) {\n        this.playTurn();\n        if (this.board.checkForWinner()) break;\n        console.log(this.board);\n        this.switchPlayer();\n      }\n\n      console.log(\"GAME OVER!!\");\n    }\n  }]);\n\n  return Game;\n}();\n\nexports.default = Game;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9saWIvZ2FtZS5qcz85M2M2Il0sIm5hbWVzIjpbIkdSSURfU0laRSIsIldJTk5JTkdfU0VRVUVOQ0UiLCJQTEFZRVIxIiwiUExBWUVSMiIsIkdhbWUiLCJwbGF5ZXIxIiwicGxheWVyMiIsImJvYXJkIiwiQm9hcmQiLCJjdXJyZW50UGxheWVyIiwibW92ZSIsImdldE1vdmUiLCJwbGFjZVN0b25lIiwic3dpdGNoQ29sb3IiLCJwbGF5VHVybiIsImNoZWNrRm9yV2lubmVyIiwiY29uc29sZSIsImxvZyIsInN3aXRjaFBsYXllciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7QUFFQSxJQUFNQSxZQUFZLEVBQWxCO0FBQ0EsSUFBTUMsbUJBQW1CLENBQXpCO0FBQ0EsSUFBTUMsVUFBVSxTQUFoQjtBQUNBLElBQU1DLFVBQVUsU0FBaEI7O0lBRXFCQyxJO0FBQ25CLGdCQUFZQyxPQUFaLEVBQXFCQyxPQUFyQixFQUE2RTtBQUFBLFFBQS9DQyxLQUErQyx1RUFBdkMsSUFBSUMsZUFBSixDQUFVUixTQUFWLEVBQXFCQyxnQkFBckIsQ0FBdUM7O0FBQUE7O0FBQzNFLFNBQUtJLE9BQUwsR0FBZUEsT0FBZjtBQUNBLFNBQUtDLE9BQUwsR0FBZUEsT0FBZjtBQUNBLFNBQUtDLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFNBQUtFLGFBQUwsR0FBcUJQLE9BQXJCO0FBQ0Q7Ozs7K0JBRVM7QUFDUixVQUFJUSxhQUFKO0FBQ0EsVUFBSSxLQUFLRCxhQUFMLEtBQXVCUCxPQUEzQixFQUFvQztBQUNsQ1EsZUFBTyxLQUFLTCxPQUFMLENBQWFNLE9BQWIsRUFBUDtBQUNELE9BRkQsTUFFTztBQUNMRCxlQUFPLEtBQUtKLE9BQUwsQ0FBYUssT0FBYixFQUFQO0FBQ0Q7QUFDRCxXQUFLSixLQUFMLENBQVdLLFVBQVgsQ0FBc0JGLElBQXRCO0FBQ0Q7OzttQ0FFYztBQUNiLFdBQUtILEtBQUwsQ0FBV00sV0FBWDtBQUNBLFdBQUtKLGFBQUwsR0FBcUIsS0FBS0EsYUFBTCxLQUF1QlAsT0FBdkIsR0FBaUNDLE9BQWpDLEdBQTJDRCxPQUFoRTtBQUNEOzs7MkJBRUs7QUFDSixhQUFPLElBQVAsRUFBYTtBQUNYLGFBQUtZLFFBQUw7QUFDQSxZQUFJLEtBQUtQLEtBQUwsQ0FBV1EsY0FBWCxFQUFKLEVBQWlDO0FBQ2pDQyxnQkFBUUMsR0FBUixDQUFZLEtBQUtWLEtBQWpCO0FBQ0EsYUFBS1csWUFBTDtBQUNEOztBQUVERixjQUFRQyxHQUFSLENBQVksYUFBWjtBQUNEOzs7Ozs7a0JBaENrQmIsSSIsImZpbGUiOiIuL2xpYi9nYW1lLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJvYXJkIGZyb20gXCIuL2JvYXJkXCI7XG5cbmNvbnN0IEdSSURfU0laRSA9IDE1O1xuY29uc3QgV0lOTklOR19TRVFVRU5DRSA9IDU7XG5jb25zdCBQTEFZRVIxID0gXCJQTEFZRVIxXCI7XG5jb25zdCBQTEFZRVIyID0gXCJQTEFZRVIyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvcihwbGF5ZXIxLCBwbGF5ZXIyLCBib2FyZCA9IG5ldyBCb2FyZChHUklEX1NJWkUsIFdJTk5JTkdfU0VRVUVOQ0UpKXtcbiAgICB0aGlzLnBsYXllcjEgPSBwbGF5ZXIxO1xuICAgIHRoaXMucGxheWVyMiA9IHBsYXllcjI7XG4gICAgdGhpcy5ib2FyZCA9IGJvYXJkO1xuICAgIHRoaXMuY3VycmVudFBsYXllciA9IFBMQVlFUjE7XG4gIH1cblxuICBwbGF5VHVybigpe1xuICAgIGxldCBtb3ZlO1xuICAgIGlmICh0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IFBMQVlFUjEpIHtcbiAgICAgIG1vdmUgPSB0aGlzLnBsYXllcjEuZ2V0TW92ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBtb3ZlID0gdGhpcy5wbGF5ZXIyLmdldE1vdmUoKTtcbiAgICB9XG4gICAgdGhpcy5ib2FyZC5wbGFjZVN0b25lKG1vdmUpO1xuICB9XG5cbiAgc3dpdGNoUGxheWVyKCkge1xuICAgIHRoaXMuYm9hcmQuc3dpdGNoQ29sb3IoKTtcbiAgICB0aGlzLmN1cnJlbnRQbGF5ZXIgPSB0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IFBMQVlFUjEgPyBQTEFZRVIyIDogUExBWUVSMTtcbiAgfVxuXG4gIHBsYXkoKXtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgdGhpcy5wbGF5VHVybigpO1xuICAgICAgaWYgKHRoaXMuYm9hcmQuY2hlY2tGb3JXaW5uZXIoKSkgYnJlYWs7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmJvYXJkKTtcbiAgICAgIHRoaXMuc3dpdGNoUGxheWVyKCk7XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coXCJHQU1FIE9WRVIhIVwiKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./lib/game.js\n");

/***/ })

/******/ });