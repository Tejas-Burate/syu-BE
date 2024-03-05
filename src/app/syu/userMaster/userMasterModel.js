const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");
const UserStatus = require("../userStatusMaster/userStatusMasterModel");
const TermsAndConditions = require("../termsAndConditions/termsAndConditionsModel");

class User extends Model {}

User.init(
  {
    userid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    emailpassword: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
    },
    otp: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    userstatusid: {
      type: DataTypes.INTEGER,
      defaultValue: 1, // Set default value to 1
      references: {
        model: UserStatus, // Assuming the name of the UserStatus model
        key: "userstatusid",
      },
    },
    profilephoto: {
      type: DataTypes.STRING,
    },
    deviceid: {
      type: DataTypes.STRING,
    },
    appver: {
      type: DataTypes.STRING,
    },
    mobileverified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    refuserid: {
      type: DataTypes.INTEGER,
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    termandconditions_id: {
      type: DataTypes.INTEGER,
      references: {
        model: TermsAndConditions, // Assuming the name of the UserStatus model
        key: "termandconditions_id",
      },
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
    modelName: "User",
    tableName: "usermaster",
    timestamps: true,
    createdAt: "createddate",
    updatedAt: "updateddate",
  }
);

User.belongsTo(UserStatus, { foreignKey: "userstatusid" });
User.belongsTo(TermsAndConditions, { foreignKey: "termandconditions_id" });

module.exports = User;
