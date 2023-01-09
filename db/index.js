const mongoose = require("mongoose");
const { urlDb } = require("../config");

mongoose.set("strictQuery", false);
mongoose.connect(urlDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

module.exports = db;
