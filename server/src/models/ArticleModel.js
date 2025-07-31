import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import ArticleImage from "./ArticleImageModel.js";

const Article = sequelize.define("Article", {
  articleId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  articleImageId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
});

ArticleImage.hasMany(Article, { foreignKey: "articleImageId" });
Article.belongsTo(ArticleImage, { foreignKey: "articleImageId" });

export default Article;
