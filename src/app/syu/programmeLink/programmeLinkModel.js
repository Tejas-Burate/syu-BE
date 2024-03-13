const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");
const College = require("../collegeMaster/collegeModel");
const Course = require("../courseMaster/courseModel");
const Programme = require("../programMaster/programMasterModel");

class ProgrammeLink extends Model {}

ProgrammeLink.init(
  {
    programmelinkid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    linkname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    linkurl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    linktype: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    programmeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Programme,
        key: "programmeid",
      },
    },
    collegeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: College,
        key: "collegeid",
      },
    },
    courseid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Course,
        key: "courseid",
      },
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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
      allowNull: false,
    },
    updatedby: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "programmelink",
    modelName: "ProgrammeLink",
    timestamps: true,
    createdAt: "createddate",
    updatedAt: "updateddate",
  }
);

ProgrammeLink.belongsTo(College, { foreignKey: "collegeid" });
ProgrammeLink.belongsTo(Course, { foreignKey: "courseid" });
ProgrammeLink.belongsTo(Programme, { foreignKey: "programmeid" });

module.exports = ProgrammeLink;
