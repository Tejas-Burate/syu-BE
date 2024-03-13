const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");
const College = require("../collegeMaster/collegeModel");
const Country = require("../countryMaster/countryModel");
const Department = require("../departmentMaster/departmentMasterModel");
const User = require("../userMaster/userMasterModel");
const Programme = require("../programMaster/programMasterModel");

class ProgrammePriority extends Model {}

ProgrammePriority.init(
  {
    programpriorityid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    countryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Country,
        key: "countryid",
      },
    },
    departmentid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Department,
        key: "departmentid",
      },
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "userid",
      },
    },
    directorchoice: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    directorremarks: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    counselorremarks: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    agentremarks: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    remarks: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tieupstatus: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: "programmepriority",
    modelName: "ProgrammePriority",
    timestamps: true,
    createdAt: "createddate",
    updatedAt: "updateddate",
  }
);

ProgrammePriority.belongsTo(College, { foreignKey: "collegeid" });
ProgrammePriority.belongsTo(Country, { foreignKey: "countryid" });
ProgrammePriority.belongsTo(Department, { foreignKey: "departmentid" });
ProgrammePriority.belongsTo(Programme, { foreignKey: "programmeid" });
ProgrammePriority.belongsTo(User, { foreignKey: "userid" });

module.exports = ProgrammePriority;
