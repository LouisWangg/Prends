const { Op } = require("sequelize");
const sequelize = require("../config/database");
const ArticleModel = require("../models/ArticleModel");
const ArticleImageModel = require("../models/ArticleImageModel");

// Get 3 newest Article datas for Home page
const getHomePageArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.findAll({
      attributes: ["articleId", "title", "subTitle"],
      include: [
        {
          model: ArticleImageModel,
          attributes: ["image"],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 3,
    });

    // Map results to convert image buffer to base64 string
    const response = articles.map((article) => {
      const plain = article.get({ plain: true });

      if (plain.ArticleImage) {
        plain.ArticleImage.image = plain.ArticleImage.image
          ? plain.ArticleImage.image.toString("base64")
          : null;
      }

      return plain;
    });

    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Get Articles for Article page
const getArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.findAll({
      attributes: ["articleId", "title", 
        [sequelize.literal(`TO_CHAR("Article"."createdAt", 'DD MONTH YYYY')`), 'createdAt'], "subTitle"],
      include: [
        {
          model: ArticleImageModel,
          attributes: ["image"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    // Map results to convert image buffer to base64 string
    const response = articles.map((article) => {
      const plain = article.get({ plain: true });

      if (plain.ArticleImage) {
        plain.ArticleImage.image = plain.ArticleImage.image
          ? plain.ArticleImage.image.toString("base64")
          : null;
      }

      return plain;
    });

    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getHomePageArticles,
  getArticles,
};
