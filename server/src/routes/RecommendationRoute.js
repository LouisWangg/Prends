const express = require("express");
const router = express.Router();
const RecommendationController = require("../controllers/RecommendationController");

router.get("/getCombinedRecommendations", RecommendationController.getCombinedRecommendations);

module.exports = router;
