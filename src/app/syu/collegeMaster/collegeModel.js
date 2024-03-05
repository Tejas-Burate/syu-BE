const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");
const City = require("../cityMaster/cityModel.js");
const Country = require("../countryMaster/countryModel");

class College extends Model {}

College.init(
  {
    collegeid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    cityid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    countryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    collegename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    collegelevel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    collegecategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    campus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    googlemaplink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    distancecapital: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gallerylink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    worldrankingwithref: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    countryrankingwithref: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    indianfood: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    livingexpenses: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    universityinfo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    noofindianstudent: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    noofinternationalstudent: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    alumniinfo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    approvedstatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    approvedby: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    approveddate: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    createdby: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    updatedby: {
      type: DataTypes.STRING,
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
    tableName: "collegemaster",
    modelName: "College",
    timestamps: true,
    createdAt: "createddate",
    updatedAt: "updateddate",
  }
);

// Define associations
College.belongsTo(City, { foreignKey: "cityid" });
College.belongsTo(Country, { foreignKey: "countryid" });

module.exports = College;
