const sequelize = require("../config/database");

const User = require("./UserModel");
const Class = require("./ClassModel");
const ServiceType = require("./ServiceTypeModel");
const ServiceTypeImage = require("./ServiceTypeImageModel");
const ServiceTypeFeedback = require("./ServiceTypeFeedbackModel");
const Counselor = require("./CounselorModel");
const CounselorImage = require("./CounselorImageModel");
const CounselorFeedback = require("./CounselorFeedbackModel");
const Article = require("./ArticleModel");
const ArticleImage = require("./ArticleImageModel");
const Qna = require("./QnaModel");

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

ArticleImage.hasMany(Article, { foreignKey: 'articleImageId' });
Article.belongsTo(ArticleImage, { foreignKey: 'articleImageId' });

module.exports = {
  sequelize,
  User,
  Class,
  ServiceType,
  ServiceTypeImage,
  ServiceTypeFeedback,
  Counselor,
  CounselorImage,
  CounselorFeedback,
  Article,
  ArticleImage,
  Qna
};
