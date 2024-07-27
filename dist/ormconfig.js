"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppDataSource = void 0;
var _typeorm = require("typeorm");
var _User = require("./entities/User");
var _Book = require("./entities/Book");
var _UserBorrow = require("./entities/UserBorrow");
const AppDataSource = exports.AppDataSource = new _typeorm.DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '102030',
  database: 'invent_analytics',
  synchronize: true,
  logging: false,
  entities: [_User.User, _Book.Book, _UserBorrow.UserBorrow],
  migrations: [],
  subscribers: []
});