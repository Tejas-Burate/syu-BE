const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");

class DocumentType extends Model {}

DocumentType.init(
  {
    documenttypeid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    documentname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    showtostudent: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    showtoagent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdby: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    updatedby: {
      type: DataTypes.INTEGER,
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
  },
  {
    sequelize,
    tableName: "documenttypemaster",
    modelName: "DocumentType",
    timestamps: true,
    createdAt: "createddate",
    updatedAt: "updateddate",
  }
);

module.exports = DocumentType;
