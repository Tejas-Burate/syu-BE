const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");
const Country = require("../countryMaster/countryModel");

class State extends Model {}

State.init(
  {
    stateid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    countryid: {
      type: DataTypes.INTEGER,
      references: {
        model: Country, // Assuming the name of the UserStatus model
        key: "countryid",
      },
    },
    statename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdby: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    updatedby: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    modelName: "State",
    tableName: "statemaster",
    timestamps: true,
    createdAt: "createddate",
    updatedAt: "updateddate",
  }
);

State.belongsTo(Country, { foreignKey: "countryid" });

module.exports = State;
