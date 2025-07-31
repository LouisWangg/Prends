import express from "express";
import * as RecommendationController from "../controllers/RecommendationController.js";

const router = express.Router();

router.get("/getServiceTypeAndSeniorCounselorRecommendations", RecommendationController.getServiceTypeAndSeniorCounselorRecommendations);
router.get("/getCounselorAndSeniorCounselorRecommendations", RecommendationController.getCounselorAndSeniorCounselorRecommendations);
router.get("/getServiceTypeAndFamilyRecommendations", RecommendationController.getServiceTypeAndFamilyRecommendations);
router.get("/getDeboraAssessmentRecommendations", RecommendationController.getDeboraAssessmentRecommendations);
router.get("/getShanenClassRecommendations", RecommendationController.getShanenClassRecommendations);
router.get("/getSeniorCounselorRecommendations", RecommendationController.getSeniorCounselorRecommendations);
router.get("/getServiceTypeRecommendations", RecommendationController.getServiceTypeRecommendations);

export default router;
