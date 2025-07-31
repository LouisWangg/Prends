import { Op, Sequelize, fn, col } from "sequelize";

import UserModel from "../models/UserModel.js";
import CounselorCommentModel from "../models/CounselorCommentModel.js";

// Get Comment datas for Counselor Detail page
export const getCounselorCommentsById = async ({ id, sort } = {}) => {
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
        attributes: [[Sequelize.literal(`"User"."firstName" || ' ' || "User"."lastName"`), 'fullName']],
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
    where: { counselorId: id },
    raw: true
  });

  return { datas, counts };
};
