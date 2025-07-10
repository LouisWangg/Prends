const sharedService = require("../services/SharedService");

const getDescriptionsAndNotices = async (req, res) => {
  try {
    const { type, id } = req.params;
    const result = await sharedService.getDescriptionsAndNotices({ type, id });
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Failed to run getDescriptionsAndNotices");
  }
};

module.exports = {
  getDescriptionsAndNotices,
};
