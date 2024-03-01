const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection"); // Adjust the path as per your project structure
const User = require("../userMaster/userMasterModel");

class AddressMaster extends Model {}

AddressMaster.init(
  {
    addressId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "userId",
      },
    },
    mAddressLine1: {
      type: DataTypes.STRING,
    },
    mAddressLine2: {
      type: DataTypes.STRING,
    },
    mCountry: {
      type: DataTypes.STRING,
    },
    mState: {
      type: DataTypes.STRING,
    },
    mCity: {
      type: DataTypes.STRING,
    },
    mPincode: {
      type: DataTypes.STRING,
    },
    pAddressLine1: {
      type: DataTypes.STRING,
    },
    pAddressLine2: {
      type: DataTypes.STRING,
    },
    pCountry: {
      type: DataTypes.STRING,
    },
    pState: {
      type: DataTypes.STRING,
    },
    pCity: {
      type: DataTypes.STRING,
    },
    pPincode: {
      type: DataTypes.STRING,
    },
    createdDate: {
      type: DataTypes.DATE,
    },
    updatedDate: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: "addressMaster",
    modelName: "AddressMaster",
    timestamps: false,
  }
);

AddressMaster.belongsTo(User, { foreignKey: "userId" });

module.exports = AddressMaster;
