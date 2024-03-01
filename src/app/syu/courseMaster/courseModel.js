const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");
class Course extends Model {}

Course.init(
  {
    courseId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
    },
    courseName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // courseLevel: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    courseFullForm: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    filledBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    streamName: {
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
    tableName: "courseMaster",
    modelName: "Course",
    timestamps: false,
  }
);

module.exports = Course;
