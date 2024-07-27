"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveBook = exports.getList = exports.getBook = void 0;
var _Book = require("../entities/Book");
var _UserBorrow = require("../entities/UserBorrow");
var _ormconfig = require("../ormconfig");
var _expressValidator = require("express-validator");
const getList = async (req, res) => {
  const books = await _ormconfig.AppDataSource.manager.find(_Book.Book);
  res.json(books);
};
exports.getList = getList;
const getBook = async (req, res) => {
  const book = await _ormconfig.AppDataSource.manager.findOneBy(_Book.Book, {
    id: parseInt(req.params.id)
  });
  if (book) {
    const borrow_books = await _ormconfig.AppDataSource.manager.find(_UserBorrow.UserBorrow, {
      where: {
        book: {
          id: parseInt(req.params.id)
        },
        status: 1
      },
      relations: ["book"]
    });
    if (borrow_books.length == 0) {
      book.averageRating = -1;
    } else {
      let avg = 0;
      for (let index = 0; index < borrow_books.length; index++) {
        const element = borrow_books[index];
        avg += element.score;
      }
      let avg_last = avg / borrow_books.length;
      book.averageRating = avg_last;
    }
    res.json(book);
  } else {
    res.status(404).send('Book not found');
  }
};
exports.getBook = getBook;
const saveBook = async (req, res) => {
  const errors = (0, _expressValidator.validationResult)(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  const {
    name
  } = req.body;

  // Kullanıcıyı oluşturma
  const book = new _Book.Book();
  book.name = name;

  // Veritabanına kaydetme
  try {
    await _ormconfig.AppDataSource.manager.save(book);
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).send('Kitap Oluşturma Hatası');
  }
};
exports.saveBook = saveBook;