const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");

class Stream extends Model {}

Stream.init(
  {
    streamid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    streamname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    streamfullfrom: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    isactive: {
      type: DataTypes.BOOLEAN,
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
    tableName: "streammaster",
    modelName: "Stream",
    timestamps: true,
    createdAt: "createddate",
    updatedAt: "updateddate",
  }
);

module.exports = Stream;
