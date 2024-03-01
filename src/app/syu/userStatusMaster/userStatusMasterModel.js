const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");
const User = require("../userMaster/userMasterModel");
const Department = require("../departmentMaster/departmentMasterModel");

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
      allowNull: false,
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
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    createddate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updateddate: {
      type: DataTypes.DATE,
      allowNull: false,
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
    tableName: "userstatusmaster", // Adjust the table name if needed
    timestamps: false,
  }
);

// Define foreign key associations
UserStatus.belongsTo(Department, { foreignKey: "departmentid" });
// UserStatus.belongsTo(User, { foreignKey: "departmentmanager" });

module.exports = UserStatus;
