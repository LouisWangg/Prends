const { Op, fn, col, literal } = require("sequelize");

const ServiceTypeModel = require("../models/ServiceTypeModel");
const ServiceTypeImageModel = require("../models/ServiceTypeImageModel");
const ServiceTypeCommentModel = require("../models/ServiceTypeCommentModel");

const { convertImages } = require("../utils/ConvertImage");

const getServiceTypes = async ({ subType = null, sortBy = null }) => {
  const finalPriceLiteral = literal(`
    CASE 
      WHEN "discountFlag" = true AND "discountPrice" > 0 
      THEN "discountPrice" 
      ELSE "price" 
    END
  `);

  let orderClause;
  switch (sortBy) {
    case "commentCount":
      orderClause = [["commentCount", "DESC"]];
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
      orderClause = [["serviceTypeId", "ASC"]];
  }

  const datas = await ServiceTypeModel.findAll({
    attributes: [
      "serviceTypeId",
      "name",
      "price",
      "discountFlag",
      "discountPrice",
      "type",
      "subType",
      [fn("COUNT", col("ServiceTypeComments.serviceTypeCommentId")), "commentCount"]
    ],
    where: subType
      ? {
        subType: {
          [Op.iLike]: `%${subType}%`,
        },
      } : undefined,
    include: [
      {
        model: ServiceTypeImageModel,
        attributes: ["image"],
      },
      {
        model: ServiceTypeCommentModel,
        attributes: [],
      },
    ],
    group: [
      "ServiceType.serviceTypeId",
      "ServiceTypeImages.serviceTypeImageId",
    ],
    order: orderClause
  });

  if (!datas) return null;

  return convertImages(datas, "ServiceTypeImages");
};

// Get Service detail data by Id
const getServiceDetailById = async ({ id } = {}) => {
  const data = await ServiceTypeModel.findByPk(id, {
    include: [
      {
        model: ServiceTypeImageModel,
        attributes: ["serviceTypeImageId", "image"],
        separate: true,
        order: [["serviceTypeImageId", "ASC"]],
      },
    ],
  });

  if (!data) return null;

  return convertImages(data, "ServiceTypeImages");
};

module.exports = {
  getServiceTypes,
  getServiceDetailById
};
