const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");
const City = require("../cityMaster/cityModel.js");
const Country = require("../countryMaster/countryModel");

class College extends Model {}

College.init(
  {
    collegeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    collegeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    collegeLevel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    collegeCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    campus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    universityContactNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    universityMailId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    collegeType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    yearEstablished: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    googleMapLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    distanceCapital: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    accrediation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    awards: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    galleryLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    worldRankingWithRef: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    countryRankingWithRef: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    indianFood: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    livingExpenses: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    universityInfo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    noOfIndianStudent: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    noOfInternationalStudent: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    alumniInfo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    contactPerson: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contactNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    filledStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    filledBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    approvedStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    approvedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    approvedDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkName: {
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
    tableName: "collegeMaster",
    modelName: "College",
    timestamps: false,
  }
);

// Define associations
College.belongsTo(City, { foreignKey: "cityId" });
College.belongsTo(Country, { foreignKey: "countryId" });

module.exports = College;
