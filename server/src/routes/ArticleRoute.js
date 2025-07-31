import express from "express";
import ArticleController from "../controllers/ArticleController.js";

const router = express.Router();

router.get("/getHomePageArticles", ArticleController.getHomePageArticles);
router.get("/getArticles", ArticleController.getArticles);

export default router;
