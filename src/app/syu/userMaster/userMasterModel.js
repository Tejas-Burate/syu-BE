const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");
const UserStatus = require("../userStatusMaster/userStatusMasterModel");

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
    },
    emailpassword: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
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
    modelName: "User",
    tableName: "usermaster", // Adjust the table name if needed
    timestamps: false,
  }
);

User.belongsTo(UserStatus, { foreignKey: "userstatusid" });

module.exports = User;
