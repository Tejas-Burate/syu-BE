const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");
const Country = require("../countryMaster/countryModel");

class City extends Model {}

City.init(
  {
    cityId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Country,
        key: "countryId", // Adjust according to the primary key of the countryMaster table
      },
    },
    cityName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    stateName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    population: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    safetyIndex: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    maxTemp: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    minTemp: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    timeZone: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    distanceFrmNearIntlAirport: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
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
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    updatedDate: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "cityMaster",
    modelName: "City",
    timestamps: false,
  }
);

City.belongsTo(Country, { foreignKey: "countryId" }); // Define the association

module.exports = City;
