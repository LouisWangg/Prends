const RecommendationService = require("../services/RecommendationService");

const getIndividualCounselingRecommendations = async (req, res) => {
  try {
    const { excludeId, subType } = req.query;
    const result = await RecommendationService.getIndividualCounselingRecommendations({ excludeId, subType });
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getIndividualCounselingRecommendations");
  }
};

const getCounselorRecommendations = async (req, res) => {
  try {
    const { excludeId, subType } = req.query;
    const result = await RecommendationService.getCounselorRecommendations({ excludeId, subType });
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
