"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _userController = require("../controllers/userController");
var _userBorrowController = require("../controllers/userBorrowController");
var _userSaveMiddleware = require("../middlewares/userSaveMiddleware");
var _returnBorrowMiddleware = require("../middlewares/returnBorrowMiddleware");
const router = (0, _express.Router)();
router.get('/', _userController.userList);
router.get('/:id', _userController.getUser);
router.post('/', _userSaveMiddleware.userSaveMiddleware, _userController.saveUser);
router.post('/:user/borrow/:book', _userBorrowController.borrowBook);
router.post('/:user/return/:book', _returnBorrowMiddleware.returnBorrowMiddleware, _userBorrowController.returnBook);
var _default = exports.default = router;