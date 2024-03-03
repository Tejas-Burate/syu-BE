const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection"); // Adjust the path as per your project structure
const Department = require("../departmentMaster/departmentMasterModel");
const User = require("../userMaster/userMasterModel");

class Role extends Model {}

Role.init(
  {
    roleid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rolename: {
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
    location: {
      type: DataTypes.STRING,
    },
    isactive: {
      type: DataTypes.STRING(10),
      defaultValue: "TRUE",
    },
    createddate: {
      type: DataTypes.STRING,
    },
    updateddate: {
      type: DataTypes.STRING,
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
    modelName: "Role",
    tableName: "rolemaster",
    timestamps: false,
  }
);

Role.belongsTo(Department, { foreignKey: "departmentid" });
Role.belongsTo(User, { foreignKey: "departmentmanager" });

module.exports = Role;
