const express = require("express");
const router = express.Router();
const ArticleController = require("../controllers/ArticleController");

router.get("/getHomePageArticles", ArticleController.getHomePageArticles);
router.get("/getArticles", ArticleController.getArticles);

module.exports = router;
