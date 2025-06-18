const sequelize = require("../config/database");

const User = require("./UserModel");
const Class = require("./ClassModel");
const ServiceType = require("./ServiceTypeModel");
const ServiceTypeImage = require("./ServiceTypeImageModel");
const ServiceTypePrice = require("./ServiceTypePriceModel");
const ServiceTypeComment = require("./ServiceTypeCommentModel");
const Counselor = require("./CounselorModel");
const CounselorImage = require("./CounselorImageModel");
const CounselorComment = require("./CounselorCommentModel");
const Article = require("./ArticleModel");
const ArticleImage = require("./ArticleImageModel");
const Qna = require("./QnaModel");
const SharedDescription = require("./SharedDescriptionModel");

// Define associations here
User.hasMany(ServiceTypeComment, { foreignKey: 'userId' });
ServiceTypeComment.belongsTo(User, { foreignKey: 'userId' });

ServiceType.hasMany(ServiceTypePrice, { foreignKey: 'serviceTypeId' });
ServiceTypePrice.belongsTo(ServiceType, { foreignKey: 'serviceTypeId' });

ServiceType.hasMany(ServiceTypeImage, { foreignKey: "serviceTypeId" });
ServiceTypeImage.belongsTo(ServiceType, { foreignKey: "serviceTypeId" });

ServiceType.hasMany(ServiceTypeComment, { foreignKey: 'serviceTypeId' });
ServiceTypeComment.belongsTo(ServiceType, { foreignKey: 'serviceTypeId' });

Counselor.hasMany(CounselorImage, { foreignKey: 'counselorId' });
CounselorImage.belongsTo(Counselor, { foreignKey: 'counselorId' });

Counselor.hasMany(CounselorComment, { foreignKey: 'counselorId' });
CounselorComment.belongsTo(Counselor, { foreignKey: 'counselorId' });

ArticleImage.hasMany(Article, { foreignKey: 'articleImageId' });
Article.belongsTo(ArticleImage, { foreignKey: 'articleImageId' });

module.exports = {
  sequelize,
  User,
  Class,
  ServiceType,
  ServiceTypeImage,
  ServiceTypePrice,
  ServiceTypeComment,
  Counselor,
  CounselorImage,
  CounselorComment,
  Article,
  ArticleImage,
  Qna,
  SharedDescription
};
