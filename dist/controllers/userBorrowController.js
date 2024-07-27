"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.returnBook = exports.borrowBook = void 0;
var _Book = require("../entities/Book");
var _User = require("../entities/User");
var _UserBorrow = require("../entities/UserBorrow");
var _ormconfig = require("../ormconfig");
var _expressValidator = require("express-validator");
const borrowBook = async (req, res) => {
  const user = await _ormconfig.AppDataSource.manager.findOne(_User.User, {
    where: {
      id: parseInt(req.params.user)
    }
  });
  if (user == null) {
    res.status(404).send('User not found');
  }
  const book = await _ormconfig.AppDataSource.manager.findOne(_Book.Book, {
    where: {
      id: parseInt(req.params.book)
    }
  });
  if (book == null) {
    res.status(404).send('Book not found');
  }
  const user_borrow = await _ormconfig.AppDataSource.manager.findOne(_UserBorrow.UserBorrow, {
    where: {
      book: {
        id: parseInt(req.params.book)
      },
      user: {
        id: parseInt(req.params.user)
      }
    }
  });
  if (user_borrow != null) {
    res.status(404).send('Book Borrow was found');
  }
  const userBorrow = new _UserBorrow.UserBorrow();
  userBorrow.book = book;
  userBorrow.user = user;
  userBorrow.score = 0;
  userBorrow.status = 0;
  try {
    await _ormconfig.AppDataSource.manager.save(userBorrow);
    res.status(200).json(userBorrow);
  } catch (error) {
    console.error(error);
    res.status(500).send('UserBorrow Oluşturma Hatası');
  }
};
exports.borrowBook = borrowBook;
const returnBook = async (req, res) => {
  const errors = (0, _expressValidator.validationResult)(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  const {
    score
  } = req.body;
  const user = await _ormconfig.AppDataSource.manager.findOne(_User.User, {
    where: {
      id: parseInt(req.params.user)
    }
  });
  if (user == null) {
    res.status(404).send('User not found');
  }
  const book = await _ormconfig.AppDataSource.manager.findOne(_Book.Book, {
    where: {
      id: parseInt(req.params.book)
    }
  });
  if (book == null) {
    res.status(404).send('Book not found');
  }
  const user_borrow = await _ormconfig.AppDataSource.manager.findOne(_UserBorrow.UserBorrow, {
    where: {
      book: {
        id: parseInt(req.params.book)
      },
      user: {
        id: parseInt(req.params.user)
      }
    }
  });
  if (user_borrow == null) {
    res.status(404).send('Book Borrow not found');
  } else {
    try {
      user_borrow.score = score;
      user_borrow.status = 1;
      user_borrow.book = book;
      user_borrow.user = user;
      await _ormconfig.AppDataSource.manager.save(user_borrow);
      res.status(200).json(user_borrow);
    } catch (error) {
      console.log(error);
      res.status(500).send("User Borrow Update Error");
    }
  }
};
exports.returnBook = returnBook;