const { Op } = require("sequelize");
const serviceTypeFeedbackModel = require("../models/ServiceTypeFeedbackModel");

// Get Home Page Feedbacks
const getHomePageFeedbacks = async (req, res) => {
  try {
    const datas = await serviceTypeFeedbackModel.findAll({
      attributes: ["serviceTypeFeedbackId", "serviceTypeId", "title", "description"],
      order: [['serviceTypeFeedbackId', 'ASC']],
      limit: 3
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
