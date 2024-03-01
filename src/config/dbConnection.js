const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");
dotenv.config();

// const sequelize = new Sequelize(
//   process.env.DATABASE,
//   process.env.USER,
//   process.env.PASSWORD,
//   {
//     host: process.env.HOST,
//     dialect: process.env.DIALECT,
//   }
// );

// const sequelize = new Sequelize({
//   dialect: "postgres", // Specify the dialect (postgres in this case)
//   host: "ep-empty-surf-22309751-pooler.us-east-1.aws.neon.tech", // Specify the host
//   port: 5432, // Specify the port (default is 5432)
//   username: "default", // Specify the username
//   password: "kBo7us8nefGU", // Specify the password
//   database: "verceldb", // Specify the database name
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false, // If using self-signed certificates, set this to false
//     },
//   },
// });

const sequelize = new Sequelize(
  "postgres://default:kBo7us8nefGU@ep-empty-surf-22309751.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
  { dialect: process.env.DIALECT }
);

module.exports = sequelize;
