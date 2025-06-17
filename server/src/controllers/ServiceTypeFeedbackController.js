const { Op, fn, col } = require("sequelize");
const ServiceTypeFeedbackModel = require("../models/ServiceTypeFeedbackModel");

// Get Feedback datas for Home page
const getHomePageFeedbacks = async (req, res) => {
  try {
    const datas = await ServiceTypeFeedbackModel.findAll({
      attributes: ["serviceTypeFeedbackId", "title", "description"],
      order: [['createdAt', 'DESC']],
      limit: 3
    });
    res.json(datas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on running getHomePageFeedbacks");
  }
};

// Get Feedback datas for Home page
const getServiceFeedbacksById = async (req, res) => {
  try {
    const { id } = req.params;

    const datas = await ServiceTypeFeedbackModel.findAll({
      attributes: [
        "serviceTypeFeedbackId", "userId", "title", "description", "ratingOne", "ratingTwo",
        "ratingThree", "ratingFour", "ratingFive", "createdAt"
      ],
      where: {
        serviceTypeId: id
      },
      order: [['createdAt', 'ASC']]
    });
    
    const counts = await ServiceTypeFeedbackModel.findOne({
      attributes: [
        [fn('COUNT', col('*')), 'total'],
        [fn('SUM', col('ratingOne')), 'ratingOne'],
        [fn('SUM', col('ratingTwo')), 'ratingTwo'],
        [fn('SUM', col('ratingThree')), 'ratingThree'],
        [fn('SUM', col('ratingFour')), 'ratingFour'],
        [fn('SUM', col('ratingFive')), 'ratingFive'],
      ],
      where: {
        serviceTypeId: id
      },
      raw: true
    });

    res.json({ datas, counts });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on running getServiceFeedbacks");
  }
};

module.exports = {
  getHomePageFeedbacks,
  getServiceFeedbacksById
};
