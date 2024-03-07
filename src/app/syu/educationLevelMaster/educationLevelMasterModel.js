const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection"); // Adjust the path as per your project structure
const User = require("../userMaster/userMasterModel");

class EducationLevel extends Model {}

EducationLevel.init(
  {
    edulevelid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    edulevelname: {
      type: DataTypes.STRING,
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
    createdby: {
      type: DataTypes.INTEGER,
    },
    updatedby: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    tableName: "educationlevelmaster",
    modelName: "EducationLevel",
    timestamps: true,
    createdAt: "createddate",
    updatedAt: "updateddate",
  }
);

module.exports = EducationLevel;
