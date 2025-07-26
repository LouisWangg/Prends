const express = require("express");
const router = express.Router();

const RecommendationController = require("../controllers/RecommendationController");

router.get("/getServiceTypeAndSeniorCounselorRecommendations", RecommendationController.getServiceTypeAndSeniorCounselorRecommendations);
router.get("/getCounselorAndSeniorCounselorRecommendations", RecommendationController.getCounselorAndSeniorCounselorRecommendations);
router.get("/getServiceTypeAndFamilyRecommendations", RecommendationController.getServiceTypeAndFamilyRecommendations);
router.get("/getDeboraAssessmentRecommendations", RecommendationController.getDeboraAssessmentRecommendations);
router.get("/getShanenClassRecommendations", RecommendationController.getShanenClassRecommendations);
router.get("/getSeniorCounselorRecommendations", RecommendationController.getSeniorCounselorRecommendations);
router.get("/getServiceTypeRecommendations", RecommendationController.getServiceTypeRecommendations);

module.exports = router;
