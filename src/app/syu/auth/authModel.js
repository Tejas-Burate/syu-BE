const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");

class User extends Model {}

User.init(
  {
    //Basic Information
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    serialNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isdCode: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    allocatedTo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.INTEGER(50),
      allowNull: false,
    },

    birthDate: { type: DataTypes.STRING, allowNull: false }, //Need to discuss...
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    //Personal Details

    countryOfCitizenship: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stateOfCitizenship: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstLanguage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    panNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    aadhaarNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passportNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passportDOI: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passportDOE: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passportPOI: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passportIA: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    //Education Details
    lastEducationCountry: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastEducationLevel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastGradingScheme: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastGradingAverage: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    //Family Details
    parentName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    motherName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passportIA: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    parentPhoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    parentPhoneEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    parentISDCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    //Address Details
    streetAddressLine1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    streetAddressLine2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    //Social Media Details
    candidateWhatsAppNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    candidateFacebookId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    candidateInstagramId: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    //Visa Details
    refusedForVisa: {
      type: DataTypes.ENUM("Yes", "No"),
      allowNull: true,
    },
    validVisaPermit: {
      type: DataTypes.ENUM("Yes", "No"),
      allowNull: true,
    },
    validCreatedDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Active", "Inactive"),
      allowNull: true,
    },

    visaUpdatedDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    remarks: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    //Course details
    courseStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    courseReference: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    countryOfInterest: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    serviceOfInterest: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    createdBy: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    createdDate: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    updatedDate: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "userDetailsMaster",
    modelName: "userModel",
    timestamps: false,
  }
);

module.exports = User;
