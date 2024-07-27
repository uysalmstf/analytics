"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.returnBorrowMiddleware = void 0;
var _expressValidator = require("express-validator");
const returnBorrowMiddleware = exports.returnBorrowMiddleware = [(0, _expressValidator.body)('score').isInt({
  min: 1
}).withMessage('Score minimum value must be 1')];