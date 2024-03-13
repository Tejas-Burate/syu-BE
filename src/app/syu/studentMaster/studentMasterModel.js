const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");
const User = require("../userMaster/userMasterModel");
const Address = require("../addressMaster/addressMasterModel");

class StudentMaster extends Model {}

StudentMaster.init(
  {
    studentid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    syurm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: "userid", // Assuming "userid" is the correct key in User model
      },
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: "userid",
      },
    },
    refno: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    refname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    agentuserid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    agentref: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isdcode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    middlename: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    panno: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    aadhaarno: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    parentname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mothername: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    parentisdcode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    parentno: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    parentmailid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    studentwhatsappno: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    studentfacebookid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    studentinstagramid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    maddressid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Address,
        key: "addressid",
      },
      paddressid: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Address,
          key: "addressid",
        },
      },
    },
    countryofinterest: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    serviceofinterest: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lasteducationcountry: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lasteducationlevel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastgradingscheme: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastgradingaverage: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    countryofcitizenship: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stateofcitizenship: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    firstlanguage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    createddate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updateddate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    createdby: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    updatedby: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "StudentMaster",
    tableName: "studentmaster",
    timestamps: true,
    createdAt: "createddate",
    updatedAt: "updateddate",
  }
);

StudentMaster.belongsTo(User, { foreignKey: "userid" });
StudentMaster.belongsTo(Address, { foreignKey: "maddressid" });
StudentMaster.belongsTo(Address, { foreignKey: "paddressid" });

module.exports = StudentMaster;
