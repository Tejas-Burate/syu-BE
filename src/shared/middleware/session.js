// sessionMiddleware.js

const session = require("express-session");

const sessionMiddleware = session({
  secret: "keyboardcat",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
});

const ses = sessionMiddleware();
console.log(ses);
module.exports = sessionMiddleware;
