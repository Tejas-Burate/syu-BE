const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");

class Role extends Model {}

Role.init(
  {
    roleId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    roleName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    createdBy: {
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
    tableName: "userRole",
    modelName: "Role",
    timestamps: false,
  }
);

module.exports = Role;
