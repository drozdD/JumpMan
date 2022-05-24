/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Player.ts":
/*!***********************!*\
  !*** ./src/Player.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Player = /** @class */ (function () {\r\n    //public canvas = document.querySelector('canvas')\r\n    // public c = this.canvas.getContext('2d')\r\n    function Player() {\r\n        this.playerImg = '../imgs/player.png';\r\n        Player.position = {\r\n            x: 152,\r\n            y: 70\r\n        };\r\n        this.drawPlayerOnStart();\r\n    }\r\n    Player.prototype.drawPlayerOnStart = function () {\r\n        var image = new Image();\r\n        image.src = this.playerImg;\r\n        image.onload = function () {\r\n            var canvas = document.querySelector('canvas');\r\n            var c = canvas.getContext('2d');\r\n            c.drawImage(image, 0, 22, // Start at 70/20 pixels from the left and the top of the image (crop),\r\n            16, 10, // \"Get\" a `50 * 50` (w * h) area from the source image (crop),\r\n            Player.position.x, Player.position.y, // Place the result at 0, 0 in the canvas,\r\n            16, 10); // With as width / height: 100 * 100 (scale)\r\n        };\r\n    };\r\n    return Player;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\r\n\n\n//# sourceURL=webpack://JumpMan/./src/Player.ts?");

/***/ }),

/***/ "./src/Playfield.ts":
/*!**************************!*\
  !*** ./src/Playfield.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Playfield = /** @class */ (function () {\r\n    function Playfield() {\r\n    }\r\n    Playfield.createNewPlayfield = function () {\r\n        var canvas = document.querySelector('canvas');\r\n        var c = canvas.getContext('2d');\r\n        canvas.width = 320;\r\n        // canvas.height = 174;\r\n        canvas.height = 200;\r\n        var plansza = new Image();\r\n        plansza.src = Playfield.levelsImg;\r\n        plansza.onload = function () {\r\n            c.drawImage(plansza, 960, 184, // Start at 70/20 pixels from the left and the top of the image (crop),\r\n            320, 184, // \"Get\" a `50 * 50` (w * h) area from the source image (crop),\r\n            0, 0, // Place the result at 0, 0 in the canvas,\r\n            320, 184); // With as width / height: 100 * 100 (scale)\r\n        };\r\n        var scorebar = new Image();\r\n        scorebar.src = Playfield.scoreBar;\r\n        scorebar.onload = function () {\r\n            c.drawImage(scorebar, 0, 0, // Start at 70/20 pixels from the left and the top of the image (crop),\r\n            320, 16, // \"Get\" a `50 * 50` (w * h) area from the source image (crop),\r\n            0, 184, // Place the result at 0, 0 in the canvas,\r\n            320, 16); // With as width / height: 100 * 100 (scale)\r\n        };\r\n    };\r\n    Playfield.levelsImg = '../imgs/levels.png';\r\n    Playfield.scoreBar = '../imgs/scoreBar.png';\r\n    return Playfield;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Playfield);\r\n\n\n//# sourceURL=webpack://JumpMan/./src/Playfield.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player */ \"./src/Player.ts\");\n/* harmony import */ var _Playfield__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Playfield */ \"./src/Playfield.ts\");\n\r\n\r\n_Playfield__WEBPACK_IMPORTED_MODULE_1__[\"default\"].createNewPlayfield();\r\nvar player = new _Player__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n\n\n//# sourceURL=webpack://JumpMan/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;