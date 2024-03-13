const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");
const College = require("../collegeMaster/collegeModel.js");

class CollegeAward extends Model {}

CollegeAward.init(
  {
    clgawardid: {
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
    award: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    agency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
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
    tableName: "collegeaward",
    modelName: "CollegeAward",
    timestamps: true,
    createdAt: "createddate",
    updatedAt: "updateddate",
  }
);

// Define associations
CollegeAward.belongsTo(College, { foreignKey: "collegeid" });

module.exports = CollegeAward;
