const express = require("express");
const router = express.Router();
const articleController = require("../controllers/ArticleController");

router.post("/getHomePageArticles", articleController.getHomePageArticles);
router.post("/getArticles", articleController.getArticles);

module.exports = router;
