const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection"); // Adjust the path as per your project structure
const User = require("../userMaster/userMasterModel");
const EducationLevel = require("../educationLevelMaster/educationLevelMasterModel");

class QualificationMaster extends Model {}

QualificationMaster.init(
  {
    studentqualid: {
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
    edulevelid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: EducationLevel, // Assuming the name of the UserStatus model
        key: "edulevelid",
      },
    },
    countryofinstitution: {
      type: DataTypes.INTEGER,
    },
    qualificationname: {
      type: DataTypes.STRING,
    },
    nameofinstitution: {
      type: DataTypes.STRING,
    },

    qualduration: {
      type: DataTypes.STRING,
    },
    schoolprimarylanguage: {
      type: DataTypes.STRING,
    },
    qualfrom: {
      type: DataTypes.DATE,
    },
    qualto: {
      type: DataTypes.DATE,
    },
    complitiondate: {
      type: DataTypes.DATE,
    },
    certificateavailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    institutionaddress: {
      type: DataTypes.STRING,
    },
    institutioncity: {
      type: DataTypes.STRING,
    },
    institutionstate: {
      type: DataTypes.STRING,
    },
    institutionzipcode: {
      type: DataTypes.STRING,
    },
    isactive: {
      type: DataTypes.BOOLEAN,
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
      type: DataTypes.INTEGER,
    },
    updatedby: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    tableName: "qualificationmaster",
    modelName: "QualificationMaster",
    timestamps: true,
    createdAt: "createddate",
    updatedAt: "updateddate",
  }
);

QualificationMaster.belongsTo(User, { foreignKey: "userid" });
QualificationMaster.belongsTo(EducationLevel, { foreignKey: "edulevelid" });

module.exports = QualificationMaster;
