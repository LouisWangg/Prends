const Feedback = require("../models/FeedbackModel");

// Get Card datas
const getFeedbacks = async (req, res) => {
  try {
    const datas = await Feedback.findAll({
        attributes: ['feedbackId', 'title', 'description']
    });
    res.json(datas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getFeedbacks
};
