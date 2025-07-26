const RecommendationService = require("../services/RecommendationService");

const getServiceTypeAndSeniorCounselorRecommendations = async (req, res) => {
  try {
    const { excludeId, subType } = req.query;
    const result = await RecommendationService.getServiceTypeAndSeniorCounselorRecommendations({ excludeId, subType });
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getServiceTypeAndSeniorCounselorRecommendations");
  }
};

const getCounselorAndSeniorCounselorRecommendations = async (req, res) => {
  try {
    const { excludeId, subType } = req.query;
    const result = await RecommendationService.getCounselorAndSeniorCounselorRecommendations({ excludeId, subType });
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getCounselorAndSeniorCounselorRecommendations");
  }
};

//

const getServiceTypeAndFamilyRecommendations = async (req, res) => {
  try {
    const { excludeId, subType } = req.query;
    const result = await RecommendationService.getServiceTypeAndFamilyRecommendations({ excludeId, subType });
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getServiceTypeAndFamilyRecommendations");
  }
};

const getDeboraAssessmentRecommendations = async (req, res) => {
  try {
    const { excludeId } = req.query;
    const result = await RecommendationService.getDeboraAssessmentRecommendations({ excludeId });
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getDeboraAssessmentRecommendations");
  }
};

const getShanenClassRecommendations = async (req, res) => {
  try {
    const { excludeId } = req.query;
    const result = await RecommendationService.getShanenClassRecommendations({ excludeId });
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getShanenClassRecommendations");
  }
};

const getSeniorCounselorRecommendations = async (req, res) => {
  try {
    const result = await RecommendationService.getSeniorCounselorRecommendations();
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getSeniorCounselorRecommendations");
  }
};

const getServiceTypeRecommendations = async (req, res) => {
  try {
    const { excludeId, subType } = req.query;
    const result = await RecommendationService.getServiceTypeRecommendations({ excludeId, subType });
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getServiceTypeRecommendations");
  }
};

module.exports = {
  getServiceTypeAndSeniorCounselorRecommendations,
  getCounselorAndSeniorCounselorRecommendations,
  getServiceTypeAndFamilyRecommendations,
  getDeboraAssessmentRecommendations,
  getShanenClassRecommendations,
  getSeniorCounselorRecommendations,
  getServiceTypeRecommendations,
};
