import SharedDescriptionService from "../services/SharedDescriptionService.js";

export const getDescriptionsAndNotices = async (req, res) => {
  try {
    const { type, id, subType } = req.query;
    const result = await SharedDescriptionService.getDescriptionsAndNotices({ type, id, subType });
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Failed to run getDescriptionsAndNotices");
  }
};

export const getTitlesAndSubtitles = async (req, res) => {
  try {
    const { type, subType } = req.query;
    const result = await SharedDescriptionService.getTitlesAndSubtitles({ type, subType });
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Failed to run getTitlesAndSubtitles");
  }
};
