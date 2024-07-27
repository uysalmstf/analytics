"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userList = exports.saveUser = exports.getUser = void 0;
var _User = require("../entities/User");
var _UserBorrow = require("../entities/UserBorrow");
var _ormconfig = require("../ormconfig");
var _expressValidator = require("express-validator");
const userList = async (req, res) => {
  const users = await _ormconfig.AppDataSource.manager.find(_User.User);
  res.json(users);
};
exports.userList = userList;
const getUser = async (req, res) => {
  const user = await _ormconfig.AppDataSource.manager.findOne(_User.User, {
    where: {
      id: parseInt(req.params.id)
    },
    relations: ["books"]
  });
  if (user) {
    const books_past = await _ormconfig.AppDataSource.manager.find(_UserBorrow.UserBorrow, {
      where: {
        user: {
          id: parseInt(req.params.id)
        },
        status: 1
      },
      relations: ["book"]
    });

    // Mevcut ödünç alınmış kitapları sorgulama
    const books_present = await _ormconfig.AppDataSource.manager.find(_UserBorrow.UserBorrow, {
      where: {
        user: {
          id: parseInt(req.params.id)
        },
        status: 0
      },
      relations: ["book"]
    });
    return res.json({
      ...user,
      books: {
        past: books_past.length > 0 ? books_past.map(borrow => borrow.book) : [],
        present: books_present.length > 0 ? books_present.map(borrow => borrow.book) : []
      }
    });
  } else {
    res.status(404).send('User not found');
  }
};
exports.getUser = getUser;
const saveUser = async (req, res) => {
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
  const user = new _User.User();
  user.name = name;

  // Veritabanına kaydetme
  try {
    await _ormconfig.AppDataSource.manager.save(user);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('User Oluşturma Hatası');
  }
};
exports.saveUser = saveUser;