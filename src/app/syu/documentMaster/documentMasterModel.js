const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");
const User = require("../userMaster/userMasterModel");
const DocumentType = require("../documentType/documentTypeModel");

class Document extends Model {}

Document.init(
  {
    documentid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userid",
      },
    },
    documenttypeid: {
      type: DataTypes.INTEGER,
      references: {
        model: DocumentType,
        key: "documenttypeid",
      },
    },
    documenturl: {
      type: DataTypes.STRING,
    },
    showtouser: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createddate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updateddate: {
      type: DataTypes.DATE,
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
    tableName: "documentmaster",
    modelName: "Document",
    timestamps: false,
  }
);

Document.belongsTo(User, { foreignKey: "userid" });
Document.belongsTo(DocumentType, { foreignKey: "documenttypeid" });

module.exports = Document;
