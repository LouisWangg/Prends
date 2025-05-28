const FeedbackModel = require("../models/FeedbackModel");

// Get Card datas
const getHomePageFeedbacks = async (req, res) => {
  try {
    const datas = await FeedbackModel.findAll({
      attributes: ['title', 'description'],
      where: {
        feedbackId: {
          [Op.lte]: 3
        }
      }
    });
    res.json(datas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getHomePageFeedbacks
};
