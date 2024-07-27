"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userSaveMiddleware = void 0;
var _expressValidator = require("express-validator");
const userSaveMiddleware = exports.userSaveMiddleware = [(0, _expressValidator.body)('name').isString().withMessage('Name must be a string')];