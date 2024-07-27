"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _bookController = require("../controllers/bookController");
var _bookSaveMiddleware = require("../middlewares/bookSaveMiddleware");
const router = (0, _express.Router)();
router.get('/', _bookController.getList);
router.get('/:id', _bookController.getBook);
router.post('/', _bookSaveMiddleware.bookSaveMiddleware, _bookController.saveBook);
var _default = exports.default = router;