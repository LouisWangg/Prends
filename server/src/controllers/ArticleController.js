const articleService = require("../services/ArticleService");

const getHomePageArticles = async (req, res) => {
  try {
    const result = await articleService.getHomePageArticles();
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getHomePageArticles");
  }
};

const getArticles = async (req, res) => {
  try {
    const result = await articleService.getArticles();
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
