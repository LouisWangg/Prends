const RecommendationService = require("../services/RecommendationService");

const getIndividualCounselingRecommendations = async (req, res) => {
  try {
    const { excludeId, type } = req.query;
    const result = await RecommendationService.getIndividualCounselingRecommendations({ excludeId, type });
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getIndividualCounselingRecommendations");
  }
};

const getCounselorRecommendations = async (req, res) => {
  try {
    const { excludeId, level } = req.query;
    const result = await RecommendationService.getCounselorRecommendations({ excludeId, level });
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getCounselorRecommendations");
  }
};

module.exports = {
  getIndividualCounselingRecommendations,
  getCounselorRecommendations
};
