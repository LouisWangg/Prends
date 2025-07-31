import * as RecommendationService from "../services/RecommendationService.js";

export const getServiceTypeAndSeniorCounselorRecommendations = async (req, res) => {
  try {
    const { excludeId, subType } = req.query;
    const result = await RecommendationService.getServiceTypeAndSeniorCounselorRecommendations({ excludeId, subType });
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getServiceTypeAndSeniorCounselorRecommendations");
  }
};

export const getCounselorAndSeniorCounselorRecommendations = async (req, res) => {
  try {
    const { excludeId, subType } = req.query;
    const result = await RecommendationService.getCounselorAndSeniorCounselorRecommendations({ excludeId, subType });
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getCounselorAndSeniorCounselorRecommendations");
  }
};

export const getServiceTypeAndFamilyRecommendations = async (req, res) => {
  try {
    const { excludeId, subType } = req.query;
    const result = await RecommendationService.getServiceTypeAndFamilyRecommendations({ excludeId, subType });
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getServiceTypeAndFamilyRecommendations");
  }
};

export const getDeboraAssessmentRecommendations = async (req, res) => {
  try {
    const { excludeId } = req.query;
    const result = await RecommendationService.getDeboraAssessmentRecommendations({ excludeId });
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getDeboraAssessmentRecommendations");
  }
};

export const getShanenClassRecommendations = async (req, res) => {
  try {
    const { excludeId } = req.query;
    const result = await RecommendationService.getShanenClassRecommendations({ excludeId });
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getShanenClassRecommendations");
  }
};

export const getSeniorCounselorRecommendations = async (req, res) => {
  try {
    const result = await RecommendationService.getSeniorCounselorRecommendations();
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getSeniorCounselorRecommendations");
  }
};

export const getServiceTypeRecommendations = async (req, res) => {
  try {
    const { excludeId, subType } = req.query;
    const result = await RecommendationService.getServiceTypeRecommendations({ excludeId, subType });
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getServiceTypeRecommendations");
  }
};
