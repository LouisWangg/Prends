import * as ArticleService from "../services/ArticleService.js";

export const getHomePageArticles = async (req, res) => {
  try {
    const result = await ArticleService.getHomePageArticles();
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getHomePageArticles");
  }
};

export const getArticles = async (req, res) => {
  try {
    const result = await ArticleService.getArticles();
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getArticles");
  }
};
