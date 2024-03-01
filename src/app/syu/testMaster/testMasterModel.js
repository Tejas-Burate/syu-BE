const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection"); // Adjust the path as per your project structure
const User = require("../userMaster/userMasterModel");

class TestMaster extends Model {}

TestMaster.init(
  {
    testId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "userId",
      },
    },
    testOverallScore: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    listening: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    reading: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    writing: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    speaking: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    dateOfExamination: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "examMaster",
    modelName: "TestMaster",
    timestamps: false,
  }
);

TestMaster.belongsTo(User, { foreignKey: "userId" });

module.exports = TestMaster;
