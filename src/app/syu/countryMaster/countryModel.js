const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");

class Country extends Model {}

Country.init(
  {
    countryid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    countryname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    countryflagurl: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    collegecount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    avgstudycost: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avglivingcost: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    currency: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    placement: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isactive: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: true,
    },
    capital: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    createdby: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    updatedby: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    createddate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updateddate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "countrymaster",
    modelName: "Country",
    timestamps: true,
    createdAt: "createddate",
    updatedAt: "updateddate",
  }
);

module.exports = Country;
