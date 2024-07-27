"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookSaveMiddleware = void 0;
var _expressValidator = require("express-validator");
const bookSaveMiddleware = exports.bookSaveMiddleware = [(0, _expressValidator.body)('name').isString().withMessage('Name must be a string')];