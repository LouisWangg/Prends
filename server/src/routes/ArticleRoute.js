const express = require("express");
const router = express.Router();
const articleController = require("../controllers/ArticleController");

router.get("/getHomePageArticles", articleController.getHomePageArticles);
router.get("/getArticles", articleController.getArticles);

module.exports = router;
