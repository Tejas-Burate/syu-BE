const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");
const Country = require("../countryMaster/countryModel");
const State = require("../stateMaster/stateMasterModel");

class City extends Model {}

City.init(
  {
    cityid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    countryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Country,
        key: "countryid", // Adjust according to the primary key of the countryMaster table
      },
    },
    cityname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    stateid: {
      type: DataTypes.STRING(100),
      allowNull: false,
      references: {
        model: State,
        key: "countryid", // Adjust according to the primary key of the countryMaster table
      },
    },
    population: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    safetyindex: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    maxtemp: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    mintemp: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    timezone: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    distancefrmnearintlairport: {
      type: DataTypes.STRING(50),
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
    tableName: "citymaster",
    modelName: "City",
    timestamps: true,
    createdAt: "createddate",
    updatedAt: "updateddate",
  }
);

City.belongsTo(Country, { foreignKey: "countryid" }); // Define the association
City.belongsTo(State, { foreignKey: "stateid" }); // Define the association

module.exports = City;
