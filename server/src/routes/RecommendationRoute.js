const express = require("express");
const router = express.Router();
const recommendationController = require("../controllers/RecommendationController");

router.get("/getIndividualCounselingRecommendations", recommendationController.getIndividualCounselingRecommendations);
router.get("/getCounselorRecommendations", recommendationController.getCounselorRecommendations);

module.exports = router;
