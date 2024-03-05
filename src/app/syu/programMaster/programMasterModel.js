const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");
const College = require("../collegeMaster/collegeModel");
const Course = require("../courseMaster/courseModel");
const Currency = require("../currencyMaster/currencyModel");

class Programme extends Model {}

Programme.init(
  {
    programmeid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    collegeid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: College,
        key: "collegeid",
      },
    },
    courseid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Course,
        key: "courseid",
      },
    },
    currencyid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Currency,
        key: "currencyid",
      },
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    programmelevel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fees: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tuitionfeepaymentmode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    semesterfeepayment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    additionalchargesforadmission: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    eligibility: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    intaketime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    applicationdeadlinedate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    timetakenbyuniversity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    campus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    languageofteaching: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    programmetype: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    universityentranceexam: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    universityentranceexamurl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    programmedescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    scholarship: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    conditionforscholarship: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    workexperiencereq: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    courselink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    brochurelink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lateapplicationallowed: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    accommodation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hosteldescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    hostelfees: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    placement: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    importantnotes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    googledrivelinkforinformation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    syulink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    agentcommission: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    agentremarks: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    createdby: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    updatedby: {
      type: DataTypes.STRING,
      allowNull: true,
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
  },
  {
    sequelize,
    tableName: "programmemaster",
    modelName: "Programme",
    timestamps: true,
    createdAt: "createddate",
    updatedAt: "updateddate",
  }
);

Programme.belongsTo(College, { foreignKey: "collegeid" });
Programme.belongsTo(Course, { foreignKey: "courseid" });
Programme.belongsTo(Currency, { foreignKey: "currencyid" });

module.exports = Programme;
