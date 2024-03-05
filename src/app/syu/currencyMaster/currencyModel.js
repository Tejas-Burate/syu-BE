const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");

const Currency = sequelize.define(
  "Currency",
  {
    currencyid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    currencyname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    valueinr: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    valuedate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createddate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updateddate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    createdby: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    updatedby: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "currencymaster",
    modelName: "Currency",
    timestamps: true,
    createdAt: "createddate",
    updatedAt: "updateddate",
  }
);

module.exports = Currency;
