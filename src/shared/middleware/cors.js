const cors = require("cors");

const corsMiddleware = () => {
  let createCors = cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  });
};

module.exports = corsMiddleware;
