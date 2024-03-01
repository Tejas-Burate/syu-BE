const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");

const Currency = sequelize.define(
  "Currency",
  {
    currencyId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    currencyName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    valueINR: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    valueDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    createdDate: {
      type: DataTypes.STRING,
    },
    updatedDate: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: "currencyMaster",
    modelName: "Currency",
    timestamps: false,
  }
);

module.exports = Currency;
