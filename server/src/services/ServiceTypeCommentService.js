const { Op, Sequelize, fn, col } = require("sequelize");

const userModel = require("../models/UserModel");
const serviceTypeCommentModel = require("../models/ServiceTypeCommentModel");

// Get Comment datas for Home page
const getHomePageComments = async () => {

    return await serviceTypeCommentModel.findAll({
      attributes: ["serviceTypeCommentId", "title", "description"],
      order: [['createdAt', 'DESC']],
      limit: 3
    });

};

// Get Comment datas for Service Detail page
const getServiceCommentsById = async ({ id, sort } = {}) => {
    let orderClause;

    if (sort === 'oldest') {
      orderClause = [['createdAt', 'ASC']];
    } else if (sort === 'newest') {
      orderClause = [['createdAt', 'DESC']];
    }

    const datas = await serviceTypeCommentModel.findAll({
      attributes: [
        "serviceTypeCommentId", "userId", "title", "description", "ratingOne", "ratingTwo",
        "ratingThree", "ratingFour", "ratingFive", "createdAt", 
        [Sequelize.literal(`TO_CHAR("ServiceTypeComment"."createdAt", 'DD/MM/YYYY')`), 'createdAtFormatted']
      ],
      include: [
        {
          model: userModel,
          attributes: [[Sequelize.literal(`"User"."firstName" || ' ' || "User"."lastName"`), 'fullName']]
        }
      ],
      where: { serviceTypeId: id },
      order: orderClause
    });

    const counts = await serviceTypeCommentModel.findOne({
      attributes: [
        [fn('COUNT', col('*')), 'total'],
        [fn('SUM', col('ratingOne')), 'ratingOne'],
        [fn('SUM', col('ratingTwo')), 'ratingTwo'],
        [fn('SUM', col('ratingThree')), 'ratingThree'],
        [fn('SUM', col('ratingFour')), 'ratingFour'],
        [fn('SUM', col('ratingFive')), 'ratingFive'],
      ],
      where: { serviceTypeId: id },
      raw: true
    });

    return { datas, counts };
};

module.exports = {
  getHomePageComments,
  getServiceCommentsById
};
