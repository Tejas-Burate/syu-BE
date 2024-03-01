const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection"); // Adjust the path as per your project structure
const User = require("../userMaster/userMasterModel");

class DocumentMaster extends Model {}

DocumentMaster.init(
  {
    documentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userId",
      },
    },
    bachelorIndividualMarksheets: {
      type: DataTypes.STRING,
    },
    consolidatedMarksheets: {
      type: DataTypes.STRING,
    },
    academicTranscript: {
      type: DataTypes.STRING,
    },
    provisionalFinalDegreeCertificate: {
      type: DataTypes.STRING,
    },
    passport: {
      type: DataTypes.STRING,
    },
    cv: {
      type: DataTypes.STRING,
    },
    letterOfRecommendation: {
      type: DataTypes.STRING,
    },
    statementOfPurposeEssay: {
      type: DataTypes.STRING,
    },
    englishLanguageCertificate: {
      type: DataTypes.STRING,
    },
    createdDate: {
      type: DataTypes.DATE,
    },
    updatedDate: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: "documentMaster",
    modelName: "DocumentMaster",
    timestamps: false,
  }
);

DocumentMaster.belongsTo(User, { foreignKey: "userId" });

module.exports = DocumentMaster;
