import { Op, literal } from "sequelize";
import CounselorModel from "../models/CounselorModel.js";
import CounselorImageModel from "../models/CounselorImageModel.js";
import { convertImages } from "../utils/ConvertImage.js";

export const getCounselors = async ({ subType = null, sortBy = "commentCount", limit = null } = {}) => {
  const finalPriceLiteral = literal(`
    CASE 
      WHEN "discountFlag" = true AND "discountPrice" > 0 
      THEN "discountPrice" 
      ELSE "price" 
    END
  `);

  const commentCountLiteral = literal(`(
    SELECT COUNT(*) FROM "CounselorComments" 
    WHERE "CounselorComments"."counselorId" = "Counselor"."counselorId"
  )`);

  let orderClause;
  switch (sortBy) {
    case "commentCount":
      orderClause = [[commentCountLiteral, "DESC"]];
      break;
    case "price_asc":
      orderClause = [[finalPriceLiteral, "ASC"]];
      break;
    case "price_desc":
      orderClause = [[finalPriceLiteral, "DESC"]];
      break;
    case "name_asc":
      orderClause = [["name", "ASC"]];
      break;
    case "name_desc":
      orderClause = [["name", "DESC"]];
      break;
    default:
      orderClause = [[commentCountLiteral, "DESC"]];
  }

  const counselors = await CounselorModel.findAll({
    attributes: {
      include: [[commentCountLiteral, "commentCount"]],
    },
    where: subType
      ? {
          subType: {
            [Op.iLike]: `%${subType}%`,
          },
        }
      : undefined,
    include: [
      {
        model: CounselorImageModel,
        attributes: ["counselorImageId", "image"],
        separate: true,
        order: [["counselorImageId", "ASC"]],
      },
    ],
    order: orderClause,
    limit: limit ? parseInt(limit) : undefined,
  });

  return convertImages(counselors, "CounselorImages");
};

export const getCounselorDetailById = async ({ id } = {}) => {
  const data = await CounselorModel.findByPk(id, {
    include: [{ model: CounselorImageModel, attributes: ["image"] }],
  });

  if (!data) return null;

  return convertImages(data, "CounselorImages");
};
