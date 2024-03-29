const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");
const User = require("../userMaster/userMasterModel");

class WorkExperience extends Model {}

WorkExperience.init(
  {
    experienceid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "userid",
      },
    },
    companyname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobtitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    enddate: {
      type: DataTypes.DATE,
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
    modelName: "WorkExperience",
    tableName: "workexperience",
    timestamps: true,
    createdAt: "createddate",
    updatedAt: "updateddate",
  }
);

WorkExperience.belongsTo(User, { foreignKey: "userid" });

module.exports = WorkExperience;
