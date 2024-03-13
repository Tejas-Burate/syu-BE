const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");
const College = require("../collegeMaster/collegeModel.js"); // Assuming the name of the College model

class CollegeContact extends Model {}

CollegeContact.init(
  {
    clgcontactid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    collegeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: College, // Assuming the name of the College model
        key: "collegeid",
      },
    },
    contactno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactperson: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mailid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
    tableName: "collegecontact",
    modelName: "CollegeContact",
    timestamps: true,
    createdAt: "createddate",
    updatedAt: "updateddate",
  }
);

// Define associations
CollegeContact.belongsTo(College, { foreignKey: "collegeid" });

module.exports = CollegeContact;
