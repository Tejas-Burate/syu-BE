const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/dbConnection"); // Adjust the path as per your project structure
const User = require("../userMaster/userMasterModel");
const Country = require("../countryMaster/countryModel");
const City = require("../cityMaster/cityModel");
const State = require("../stateMaster/stateMasterModel");

class Address extends Model {}

Address.init(
  {
    addressid: {
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
    addressline1: {
      type: DataTypes.STRING,
    },
    addressline2: {
      type: DataTypes.STRING,
    },
    countryid: {
      type: DataTypes.INTEGER,
      references: {
        model: Country,
        key: "countryid",
      },
    },
    stateid: {
      type: DataTypes.INTEGER,
      references: {
        model: State,
        key: "stateid",
      },
    },
    cityid: {
      type: DataTypes.INTEGER,
      references: {
        model: City,
        key: "cityid",
      },
    },
    pincode: {
      type: DataTypes.STRING,
    },
    addresstype: {
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
    tableName: "addressmaster",
    modelName: "Address",
    timestamps: true,
    createdAt: "createddate",
    updatedAt: "updateddate",
  }
);

Address.belongsTo(User, { foreignKey: "userid" });
Address.belongsTo(Country, { foreignKey: "countryid" });
Address.belongsTo(State, { foreignKey: "stateid" });
Address.belongsTo(City, { foreignKey: "cityid" });

module.exports = Address;
