const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection");
// const User = require("../userMaster/userMasterModel");

class Intake extends Model {}

Intake.init(
  {
    intakeid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    intaketime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdby: {
      type: DataTypes.INTEGER,
      allowNull: false,
      //   references: {
      //     model: User,
      //     key: "userid",
      //   },
    },
    updatedby: {
      type: DataTypes.INTEGER,
      allowNull: false,
      //   references: {
      //     model: User,
      //     key: "userid",
      //   },
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
    tableName: "intakemaster",
    modelName: "Intake",
    timestamps: true,
    createdAt: "createddate",
    updatedAt: "updateddate",
  }
);

// Define foreign key associations
// IntakeMaster.belongsTo(User, { foreignKey: "CreatedBy", as: "CreatedByUser" });
// IntakeMaster.belongsTo(User, { foreignKey: "UpdatedBy", as: "UpdatedByUser" });

module.exports = Intake;
