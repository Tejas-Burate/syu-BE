const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");
const College = require("../collegeMaster/collegeModel");
const Course = require("../courseMaster/courseModel");
const Currency = require("../currencyMaster/currencyModel");

class Programme extends Model {}

Programme.init(
  {
    programmeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
    },
    collegeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: College,
        key: "collegeId",
      },
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Course,
        key: "courseId",
      },
    },
    currencyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Currency,
        key: "currencyId",
      },
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    programmeLevel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fees: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tuitionFeePaymentMode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    semesterFeePayment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    additionalChargesForAdmission: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    eligibility: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    intakeTime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    applicationDeadlineDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    timeTakenByUniversity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    campus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    languageOfTeaching: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    programmeType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    universityEntranceExam: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    universityEntranceExamUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    programmeDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    scholarship: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    conditionForScholarship: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    workExperienceReq: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    courseLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    brochureLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lateApplicationAllowed: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    accommodation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hostelDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    hostelFees: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    placement: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    importantNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    mailerImageName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    syuLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    updatedBy: {
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
    tableName: "programmeMaster",
    modelName: "Programme",
    timestamps: false,
  }
);

Programme.belongsTo(College, { foreignKey: "collegeId" });
Programme.belongsTo(Course, { foreignKey: "courseId" });
Programme.belongsTo(Currency, { foreignKey: "currencyId" });

module.exports = Programme;
