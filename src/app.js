const express = require("express");
// const morgan = require("morgan");
// const cors = require("cors");
const app = express();
// const passport = require("./config/passport");

//// Command to start passport ////
// app.use(passport.initialize());

//// Allow blob responses to be readable ////
// app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// app.use(cors(
//   {origin : process.env.CORS_URI}
// ));

// app.use(morgan("combined"));

app.use(require("./routes"));

module.exports = app;
