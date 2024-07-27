"use strict";

require("reflect-metadata");
var _express = _interopRequireDefault(require("express"));
var _ormconfig = require("./ormconfig");
var _userRoutes = _interopRequireDefault(require("./routes/userRoutes"));
var _bookRoutes = _interopRequireDefault(require("./routes/bookRoutes"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const app = (0, _express.default)();
const PORT = 3002;
app.use(_express.default.json());
app.use('/users', _userRoutes.default);
app.use('/books', _bookRoutes.default);
_ormconfig.AppDataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => console.log(error));