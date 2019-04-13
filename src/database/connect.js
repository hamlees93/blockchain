const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost/blockchain",
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
mongoose.connection.on("error", console.log);

module.exports = mongoose;
