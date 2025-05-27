const sequelize = require("../config/database");

const User = require("./UserModel");
const ServiceType = require("./ServiceTypeModel");
const ServiceTypeImage = require("./ServiceTypeImageModel");
const ServiceTypeFeedback = require("./ServiceTypeFeedbackModel");
const Class = require("./ClassModel");
const Counselor = require("./CounselorModel");
const CounselorImage = require("./CounselorImageModel");
const CounselorFeedback = require("./CounselorFeedbackModel");

// Define associations here
User.hasMany(ServiceTypeFeedback, { foreignKey: 'userId' });
ServiceTypeFeedback.belongsTo(User, { foreignKey: 'userId' });

ServiceType.hasMany(ServiceTypeImage, { foreignKey: "serviceTypeId" });
ServiceTypeImage.belongsTo(ServiceType, { foreignKey: "serviceTypeId" });

ServiceType.hasMany(ServiceTypeFeedback, { foreignKey: 'serviceTypeId' });
ServiceTypeFeedback.belongsTo(ServiceType, { foreignKey: 'serviceTypeId' });

Counselor.hasMany(CounselorImage, { foreignKey: 'counselorId' });
CounselorImage.belongsTo(Counselor, { foreignKey: 'counselorId' });

Counselor.hasMany(CounselorFeedback, { foreignKey: 'counselorId' });
CounselorFeedback.belongsTo(Counselor, { foreignKey: 'counselorId' });

module.exports = {
  sequelize,
  User,
  ServiceType,
  ServiceTypeImage,
  ServiceTypeFeedback,
  Class,
  Counselor,
  CounselorImage,
  CounselorFeedback
};
