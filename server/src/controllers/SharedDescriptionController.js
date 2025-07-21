const SharedDescriptionService = require("../services/SharedDescriptionService");

const getDescriptionsAndNotices = async (req, res) => {
  try {
    const { itemType, id, type } = req.query;
    const result = await SharedDescriptionService.getDescriptionsAndNotices({ itemType, id, type });
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Failed to run getDescriptionsAndNotices");
  }
};

const getTitlesAndSubtitles = async (req, res) => {
  try {
    const { itemType, type } = req.query;
    const result = await SharedDescriptionService.getTitlesAndSubtitles({ itemType, type });
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Failed to run getTitlesAndSubtitles");
  }
};

module.exports = {
  getDescriptionsAndNotices,
  getTitlesAndSubtitles
};
