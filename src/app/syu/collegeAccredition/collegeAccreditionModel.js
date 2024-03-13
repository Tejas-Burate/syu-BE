const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");
const College = require("../collegeMaster/collegeModel");

class CollegeAccreditation extends Model {}

CollegeAccreditation.init(
  {
    clgaccredid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    collegeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: College,
        key: "collegeid",
      },
    },
    accreditation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    agencyname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
      type: DataTypes.STRING,
      allowNull: true,
    },
    updatedby: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "collegeaccreditation",
    modelName: "CollegeAccreditation",
    timestamps: true,
    createdAt: "createddate",
    updatedAt: "updateddate",
  }
);

CollegeAccreditation.belongsTo(College, { foreignKey: "collegeid" });

module.exports = CollegeAccreditation;
