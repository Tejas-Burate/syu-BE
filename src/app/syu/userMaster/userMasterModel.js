const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");

class User extends Model {}
User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    mobileNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userRole: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maritalStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emergencyContactName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emergencyContactPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emergencyContactEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emergencyContactRelationWithApplicant: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isStudentUnitedStatesPermanentResidentOrGreenCardHolder: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    createdDate: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.NOW,
    },
    updatedDate: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "userMaster",
    modelName: "User",
    timestamps: false,
  }
);

module.exports = User;
