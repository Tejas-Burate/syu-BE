const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");
const User = require("../userMaster/userMasterModel");

class EnglishExam extends Model {}

EnglishExam.init(
  {
    engexamid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    examtype: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    examdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    listening: {
      type: DataTypes.FLOAT,
    },
    reading: {
      type: DataTypes.FLOAT,
    },
    speaking: {
      type: DataTypes.FLOAT,
    },
    writing: {
      type: DataTypes.FLOAT,
    },
    overall: {
      type: DataTypes.FLOAT,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "userid",
      },
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdby: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        //     model: UserMaster,
        //     key: "userid"
        //   }
      },
      updatedby: {
        type: DataTypes.INTEGER,
        allowNull: false,
        //   references: {
        //     model: UserMaster,
        //     key: "userid"
      },
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
    tableName: "englishexammaster",
    modelName: "EnglishExam",
    timestamps: true,
    createdAt: "createddate",
    updatedAt: "updateddate",
  }
);

// Define foreign key associations
EnglishExam.belongsTo(User, { foreignKey: "userid" });
// EnglishExam.belongsTo(UserMaster, { foreignKey: "createdby", as: "createdByUser" });
// EnglishExam.belongsTo(UserMaster, { foreignKey: "updatedby", as: "updatedByUser" });

module.exports = EnglishExam;
