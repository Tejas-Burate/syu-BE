const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");

class Country extends Model {}

Country.init(
  {
    countryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    countryName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    countryFlagUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    collegeCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    avgStudyCost: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avgLivingCost: {
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
    isActive: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },
    capital: {
      type: DataTypes.STRING(100),
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
    tableName: "countryMaster",
    modelName: "Country",
    timestamps: false,
  }
);

module.exports = Country;
