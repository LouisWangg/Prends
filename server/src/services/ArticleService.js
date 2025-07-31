import { Op } from "sequelize";
import sequelize from "../config/database.js";

import ArticleModel from "../models/ArticleModel.js";
import ArticleImageModel from "../models/ArticleImageModel.js";

import { convertArticleImages } from "../utils/ConvertImage.js";

// Get 3 newest Article datas for Home page
export const getHomePageArticles = async () => {
  const articles = await ArticleModel.findAll({
    attributes: ["articleId", "title", "subTitle"],
    include: [{ model: ArticleImageModel, attributes: ["image"] }],
    order: [["createdAt", "DESC"]],
    limit: 3,
  });

  return convertArticleImages(articles);
};

// Get Articles for Article page
export const getArticles = async () => {
  const articles = await ArticleModel.findAll({
    attributes: [
      "articleId",
      "title",
      [sequelize.literal(`TO_CHAR("Article"."createdAt", 'DD MONTH YYYY')`), "createdAt"],
      "subTitle",
    ],
    include: [{ model: ArticleImageModel, attributes: ["image"] }],
    order: [["createdAt", "DESC"]],
  });

  return convertArticleImages(articles);
};
