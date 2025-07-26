const { Op, fn, col, literal } = require("sequelize");

const ClassModel = require("../models/ClassModel");

const { convertImageSameField } = require("../utils/ConvertImage");

// Get Class datas for Home page
const getClasses = async ({ subType = null, sortBy = "default", limit = null } = {}) => {
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
      "image"
    ],
    where: subType
      ? {
        subType: {
          [Op.iLike]: `%${subType}%`,
        },
      } : undefined,
    order: orderClause,
    limit: limit ? parseInt(limit) : undefined,
  });

  // Map results to convert image buffer to base64 string
  const response = convertImageSameField(datas, "image");

  return response;
};

// Get Class detail data by Id
const getClassDetailById = async ({ id } = {}) => {
  const data = await ClassModel.findByPk(id);

  if (!data) return null;

  const [convertedData] = convertImageSameField([data], "image");

  return convertedData;
};

// Upload image by id
const updateImage = async ({ id, file } = {}) => {
  // Upload an image for a specific class
  return await ClassModel.update(
    { image: file.buffer },
    { where: { classId: id } }
  );
};

module.exports = {
  getClasses,
  getClassDetailById,
  updateImage,
};
