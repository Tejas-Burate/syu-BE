const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");
const ManageStudent = require("../manageStudentMaster/manageStudentMasterModel");
class Application extends Model {}

Application.init(
  {
    applicationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: ManageStudent,
        key: "studentId",
      },
    },
    ackNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    studentName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    universityName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    programmeName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    intake: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    applicationStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    kcAssigned: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    createdDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    updatedDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "applicationMaster",
    modelName: "Application",
    timestamps: false,
  }
);

Application.belongsTo(ManageStudent, { foreignKey: "studentId" });

module.exports = Application;
