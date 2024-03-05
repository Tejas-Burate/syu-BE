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

const sequelize = new Sequelize(
  `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:5432/${process.env.POSTGRES_DATABASE}?sslmode=require`,
  { dialect: process.env.DIALECT, logging: false }
);

module.exports = sequelize;
