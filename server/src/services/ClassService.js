import { Op, literal } from "sequelize";

import ClassModel from "../models/ClassModel.js";
import { convertImageSameField } from "../utils/ConvertImage.js";

// Get Class datas for Home page
export const getClasses = async ({ subType = null, sortBy = "default", limit = null } = {}) => {
  const finalPriceLiteral = literal(`
    CASE 
    WHEN "discountFlag" = true AND "discountPrice" > 0 
    THEN "discountPrice" 
    ELSE "price" 
    END
  `);

  let orderClause;
  switch (sortBy) {
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
      orderClause = [["classId", "DESC"]];
  }

  const datas = await ClassModel.findAll({
    attributes: [
      "classId",
      "name",
      "price",
      "discountFlag",
      "discountPrice",
      "type",
      "image",
    ],
    where: subType
      ? {
          subType: {
            [Op.iLike]: `%${subType}%`,
          },
        }
      : undefined,
    order: orderClause,
    limit: limit ? parseInt(limit) : undefined,
  });

  const response = convertImageSameField(datas, "image");

  return response;
};

// Get Class detail data by Id
export const getClassDetailById = async ({ id } = {}) => {
  const data = await ClassModel.findByPk(id);

  if (!data) return null;

  const [convertedData] = convertImageSameField([data], "image");

  return convertedData;
};

// Upload image by id
export const updateImage = async ({ id, file } = {}) => {
  return await ClassModel.update(
    { image: file.buffer },
    { where: { classId: id } }
  );
};
