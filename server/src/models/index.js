const sequelize = require("../config/database");

const User = require("./UserModel");
const ServiceType = require("./ServiceTypeModel");
const ServiceTypeImage = require("./ServiceTypeImageModel");
const Class = require("./ClassModel");

// Define associations here
ServiceType.hasMany(ServiceTypeImage, { foreignKey: "serviceTypeId" });
ServiceTypeImage.belongsTo(ServiceType, { foreignKey: "serviceTypeId" });

module.exports = {
  sequelize,
  User,
  ServiceType,
  ServiceTypeImage,
  Class
};
