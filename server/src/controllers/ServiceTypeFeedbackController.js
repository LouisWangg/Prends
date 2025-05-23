const { Op } = require("sequelize");
const serviceTypeFeedbackModel = require("../models/ServiceTypeFeedbackModel");

// Get Feedback datas for Home page
const getHomePageFeedbacks = async (req, res) => {
  try {
    const datas = await serviceTypeFeedbackModel.findAll({
      attributes: ["serviceTypeFeedbackId", "title", "description"],
      order: [['createdAt', 'ASC']],
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
