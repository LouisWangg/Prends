const { Op } = require("sequelize");
const articleModel = require("../models/ArticleModel");

// Get 3 newest Articles for Home page
const getHomePageArticles = async (req, res) => {
  try {
    const datas = await articleModel.findAll({
        attributes: ['title', 'subTitle'],
        order: [['articleId', 'DESC']],
        limit: 3
    });
    res.json(datas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Get Articles for Article page
const getArticles = async (req, res) => {
  try {
    const datas = await articleModel.findAll({
        attributes: ['title', 'subTitle', 'createdAt'],
        order: [['articleId', 'DESC']]
    });
    res.json(datas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getHomePageArticles,
  getArticles
};
