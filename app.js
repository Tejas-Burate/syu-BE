const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const sequelize = require("./src/config/dbConnection");
const Limiter = require("./src/shared/middleware/rateLimit");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();

const app = express();

// app.use(Limiter);
app.use(
  morgan(
    ":method :remote-addr :url :status :res[content-length] - :response-time"
  )
);
app.use(helmet());
app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

require("./src/config/routeRegistry")(app);

sequelize
  .authenticate()
  .then(() => {
    console.log(`Connected to the database`);
    app.listen(process.env.PORT, () => {
      console.log(`Server started at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
