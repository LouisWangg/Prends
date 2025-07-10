const ArticleService = require("../services/ArticleService");

const getHomePageArticles = async (req, res) => {
  try {
    const result = await ArticleService.getHomePageArticles();
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getHomePageArticles");
  }
};

const getArticles = async (req, res) => {
  try {
    const result = await ArticleService.getArticles();
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getArticles");
  }
};

module.exports = {
  getHomePageArticles,
  getArticles
};
