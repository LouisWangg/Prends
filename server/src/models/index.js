import sequelize from "../config/database.js";

import User from "./UserModel.js";
import Class from "./ClassModel.js";
import ServiceType from "./ServiceTypeModel.js";
import ServiceTypeImage from "./ServiceTypeImageModel.js";
import ServiceTypePrice from "./ServiceTypePriceModel.js";
import ServiceTypeComment from "./ServiceTypeCommentModel.js";
import Counselor from "./CounselorModel.js";
import CounselorImage from "./CounselorImageModel.js";
import CounselorPrice from "./CounselorPriceModel.js";
import CounselorComment from "./CounselorCommentModel.js";
import Article from "./ArticleModel.js";
import ArticleImage from "./ArticleImageModel.js";
import Qna from "./QnaModel.js";
import SharedDescription from "./SharedDescriptionModel.js";

// Define associations
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

Counselor.hasMany(CounselorPrice, { foreignKey: 'counselorId' });
CounselorPrice.belongsTo(Counselor, { foreignKey: 'counselorId' });

Counselor.hasMany(CounselorComment, { foreignKey: 'counselorId' });
CounselorComment.belongsTo(Counselor, { foreignKey: 'counselorId' });

ArticleImage.hasMany(Article, { foreignKey: 'articleImageId' });
Article.belongsTo(ArticleImage, { foreignKey: 'articleImageId' });

export {
  sequelize,
  User,
  Class,
  ServiceType,
  ServiceTypeImage,
  ServiceTypePrice,
  ServiceTypeComment,
  Counselor,
  CounselorImage,
  CounselorPrice,
  CounselorComment,
  Article,
  ArticleImage,
  Qna,
  SharedDescription
};
