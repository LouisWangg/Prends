const { Op, Sequelize, fn, col } = require("sequelize");
const UserModel = require("../models/UserModel");
const CounselorCommentModel = require("../models/CounselorCommentModel");

// Get Comment datas for Counselor Detail page
const getCounselorCommentsById = async (req, res) => {
  try {
    const { id } = req.params;
    const { sort } = req.query;
    let orderClause;

    if (sort === 'oldest') {
      orderClause = [['createdAt', 'ASC']];
    } else if (sort === 'newest') {
      orderClause = [['createdAt', 'DESC']];
    }

    const datas = await CounselorCommentModel.findAll({
      attributes: [
        "counselorCommentId", "userId", "title", "description", "ratingOne", "ratingTwo",
        "ratingThree", "ratingFour", "ratingFive", "createdAt", 
        [Sequelize.literal(`TO_CHAR("CounselorComment"."createdAt", 'DD/MM/YYYY')`), 'createdAtFormatted']
      ],
      include: [
        {
          model: UserModel,
          attributes: [
            [Sequelize.literal(`"User"."firstName" || ' ' || "User"."lastName"`), 'fullName']
          ],
        },
      ],
      where: { counselorId: id },
      order: orderClause
    });
    const counts = await CounselorCommentModel.findOne({
      attributes: [
        [fn('COUNT', col('*')), 'total'],
        [fn('SUM', col('ratingOne')), 'ratingOne'],
        [fn('SUM', col('ratingTwo')), 'ratingTwo'],
        [fn('SUM', col('ratingThree')), 'ratingThree'],
        [fn('SUM', col('ratingFour')), 'ratingFour'],
        [fn('SUM', col('ratingFive')), 'ratingFive'],
      ],
      where: {
        counselorId: id
      },
      raw: true
    });

    res.json({ datas, counts });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on running getCounselorCommentsById");
  }
};

module.exports = {
  getCounselorCommentsById
};
