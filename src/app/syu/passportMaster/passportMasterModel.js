const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");
const User = require("../userMaster/userMasterModel");

class PassportMaster extends Model {}

PassportMaster.init(
  {
    passportid: {
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
    passportno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passportdoi: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    passportdoe: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    passportpoi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passportia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refusedforvisa: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    validvisapermit: {
      type: DataTypes.BOOLEAN,
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
    tableName: "passportmaster",
    modelName: "PassportMaster",
    timestamps: true,
    createdAt: "createddate",
    updatedAt: "updateddate",
  }
);

PassportMaster.belongsTo(User, { foreignKey: "userid" });
PassportMaster.belongsTo(User, { foreignKey: "createdby" });
PassportMaster.belongsTo(User, { foreignKey: "updatedby" });

module.exports = PassportMaster;
