const { Op, fn, col, literal } = require("sequelize");

const ClassModel = require("../models/ClassModel");

// Get Class datas for Home page
const getClasses = async ({ sortBy = "default", limit = null } = {}) => {
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
      "itemType",
      "image"
    ],
    order: orderClause,
    limit: limit ? parseInt(limit) : undefined,
  });

  // Map results to convert image buffer to base64 string
  const response = datas.map((item) => {
    const plain = item.get({ plain: true });
    plain.image = formatImages(plain.image);

    return plain;
  });

  return response;
};

// Get Class detail data by Id
const getClassDetailById = async ({ id } = {}) => {
  const data = await ClassModel.findByPk(id);

  if (!data) return null;

  const convertedData = data.get({ plain: true });
  convertedData.image = formatImages(convertedData.image);

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

const formatImages = (imageBuffer) => {
  return imageBuffer ? imageBuffer.toString("base64") : null;
};

module.exports = {
  getClasses,
  getClassDetailById,
  updateImage
};
