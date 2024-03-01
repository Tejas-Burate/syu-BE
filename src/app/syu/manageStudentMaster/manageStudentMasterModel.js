const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");
const User = require("../userMaster/userMasterModel");
const Programme = require("../programMaster/programMasterModel");

class ManageStudent extends Model {}

ManageStudent.init(
  {
    studentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: "userId",
      },
    },
    programmeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Programme,
        key: "programmeId",
      },
    },
    studentName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    assignedTo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
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
    tableName: "studentMaster",
    modelName: "manageStudentModel",
    timestamps: false,
  }
);

ManageStudent.belongsTo(User, { foreignKey: "userId" });
ManageStudent.belongsTo(Programme, { foreignKey: "programmeId" });

module.exports = ManageStudent;
