const express = require("express");
const router = express.Router();
const RecommendationController = require("../controllers/RecommendationController");

router.get("/getIndividualCounselingRecommendations", RecommendationController.getIndividualCounselingRecommendations);

module.exports = router;
