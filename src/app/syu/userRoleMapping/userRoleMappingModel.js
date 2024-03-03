const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");
const Role = require("../roleMaster/roleMasterModel");
const User = require("../userMaster/userMasterModel");

class UserRole extends Model {}

UserRole.init(
  {
    userroleid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userid",
      },
    },
    roleid: {
      type: DataTypes.INTEGER,
      references: {
        model: Role,
        key: "roleid",
      },
    },

    isactive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
    modelName: "UserRole",
    tableName: "userrolemapping",
    timestamps: false,
  }
);

UserRole.belongsTo(User, { foreignKey: "userid" });
UserRole.belongsTo(Role, { foreignKey: "roleid" });

module.exports = UserRole;
