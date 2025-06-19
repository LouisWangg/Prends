const { Op, Sequelize, fn, col } = require("sequelize");
const ServiceTypeCommentModel = require("../models/ServiceTypeCommentModel");
const UserModel = require("../models/UserModel");

// Get Comment datas for Home page
const getHomePageComments = async (req, res) => {
  try {
    const datas = await ServiceTypeCommentModel.findAll({
      attributes: ["serviceTypeCommentId", "title", "description"],
      order: [['createdAt', 'DESC']],
      limit: 3
    });
    res.json(datas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on running getHomePageComments");
  }
};

// Get Comment datas for Home page
const getServiceCommentsById = async (req, res) => {
  try {
    const { id } = req.params;
    const { sort } = req.query;
    let orderClause;

    if (sort === 'oldest') {
      orderClause = [['createdAt', 'ASC']];
    } else if (sort === 'newest') {
      orderClause = [['createdAt', 'DESC']];
    }

    const datas = await ServiceTypeCommentModel.findAll({
      attributes: [
        "serviceTypeCommentId", "userId", "title", "description", "ratingOne", "ratingTwo",
        "ratingThree", "ratingFour", "ratingFive", 
        [Sequelize.literal(`TO_CHAR("ServiceTypeComment"."createdAt", 'DD/MM/YYYY')`), 'createdAtFormatted']
      ],
      include: [
        {
          model: UserModel,
          attributes: [
            [Sequelize.literal(`"User"."firstName" || ' ' || "User"."lastName"`), 'fullName']
          ],
        },
      ],
      where: { serviceTypeId: id },
      order: orderClause
    });
    const counts = await ServiceTypeCommentModel.findOne({
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
    res.status(500).send("Server error on running getServiceComments");
  }
};

module.exports = {
  getHomePageComments,
  getServiceCommentsById
};
