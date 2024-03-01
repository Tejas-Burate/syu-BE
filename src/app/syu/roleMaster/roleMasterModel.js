const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection"); // Adjust the path as per your project structure
const Department = require("../departmentMaster/departmentMasterModel");
const User = require("../userMaster/userMasterModel");

class UserStatus extends Model {}

UserStatus.init(
  {
    userstatusid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    statusname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departmentid: {
      type: DataTypes.INTEGER,
      references: {
        model: Department,
        key: "departmentid",
      },
    },
    departmentmanager: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userid",
      },
    },
    isactive: {
      type: DataTypes.STRING(10),
      defaultValue: "TRUE",
    },
    createddate: {
      type: DataTypes.STRING(100),
    },
    updateddate: {
      type: DataTypes.STRING(100),
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
    modelName: "UserStatus",
    tableName: "userstatusmaster",
    timestamps: false,
  }
);

UserStatus.belongsTo(Department, { foreignKey: "departmentid" });
UserStatus.belongsTo(User, { foreignKey: "departmentmanager" });

module.exports = UserStatus;
