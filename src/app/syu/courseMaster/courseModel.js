const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");
const Stream = require("../streamMaster/streamMasterModel");

class Course extends Model {}

Course.init(
  {
    courseid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
    },
    coursename: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    coursefullform: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    streamid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Stream,
        key: "streamid",
      },
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      default: true,
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
      allowNull: true,
    },
    updatedby: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "coursemaster",
    modelName: "Course",
    timestamps: true,
    createdAt: "createddate",
    updatedAt: "updateddate",
  }
);

Course.belongsTo(Stream, { foreignKey: "streamid" });
module.exports = Course;
