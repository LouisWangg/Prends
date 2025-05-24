const { Op } = require("sequelize");
const articleModel = require("../models/ArticleModel");
const articleImageModel = require("../models/ArticleImageModel");

// Get 3 newest Article datas for Home page
const getHomePageArticles = async (req, res) => {
  try {
    const datas = await articleModel.findAll({
      attributes: ["articleId", "title", "subTitle"],
      include: [{
        model: articleImageModel,
        attributes: ["image"],
      }],
      order: [["createdAt", "DESC"]],
      limit: 3
    });

    // Map results to convert image buffer to base64 string
    const response = datas.map(item => {
      const plain = item.get({ plain: true });

      if (plain.ArticleImage) {
        plain.ArticleImage.image = plain.ArticleImage.image
          ? plain.ArticleImage.image.toString('base64')
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
    const datas = await articleModel.findAll({
      attributes: ["title", "createdAt", "subTitle"],
      include: [{
        model: articleImageModel,
        attributes: ["image"],
      }],
      order: [["createdAt", "DESC"]]
    });

    // Map results to convert image buffer to base64 string
    const response = datas.map(item => {
      const plain = item.get({ plain: true });

      if (plain.ArticleImage) {
        plain.ArticleImage.image = plain.ArticleImage.image
          ? plain.ArticleImage.image.toString('base64')
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
  getArticles
};
