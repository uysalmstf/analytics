"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserBorrow = void 0;
var _typeorm = require("typeorm");
var _User = require("./User");
var _Book = require("./Book");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
let UserBorrow = exports.UserBorrow = (_dec = (0, _typeorm.Entity)(), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)(), _dec3 = (0, _typeorm.ManyToOne)(() => _User.User, user => user.id), _dec4 = (0, _typeorm.ManyToOne)(() => _Book.Book, book => book.id), _dec5 = (0, _typeorm.Column)(), _dec6 = (0, _typeorm.Column)(), _dec(_class = (_class2 = class UserBorrow {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);
    _initializerDefineProperty(this, "user", _descriptor2, this);
    _initializerDefineProperty(this, "book", _descriptor3, this);
    _initializerDefineProperty(this, "status", _descriptor4, this);
    _initializerDefineProperty(this, "score", _descriptor5, this);
  }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "user", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "book", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "status", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "score", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
})), _class2)) || _class);