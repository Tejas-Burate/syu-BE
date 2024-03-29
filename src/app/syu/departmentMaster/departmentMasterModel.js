const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");

class Department extends Model {}

Department.init(
  {
    departmentid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    departmentname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
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
    tableName: "departmentmaster",
    modelName: "Department",
    timestamps: true,
    createdAt: "createddate",
    updatedAt: "updateddate",
  }
);

module.exports = Department;
