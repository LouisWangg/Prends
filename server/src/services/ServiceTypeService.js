const { Op, fn, col } = require("sequelize");

const ServiceTypeModel = require("../models/ServiceTypeModel");
const ServiceTypeImageModel = require("../models/ServiceTypeImageModel");
const ServiceTypeCommentModel = require("../models/ServiceTypeCommentModel");

const getServiceTypes = async ({ itemType = null, sortBy = null }) => {
  const itemTypeValue = itemType ? itemType : null;

  let orderClause;
  switch (sortBy) {
    case "commentCount":
      orderClause = [["commentCount", "DESC"]];
      break;
    case "price_asc":
      orderClause = [["price", "ASC"]];
      break;
    case "price_desc":
      orderClause = [["price", "DESC"]];
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

  console.log("IT BE = " + itemTypeValue)

  const datas = await ServiceTypeModel.findAll({
    attributes: [
      "serviceTypeId",
      "name",
      "price",
      "discountFlag",
      "discountPrice",
      "itemType",
      "type",
      [fn("COUNT", col("ServiceTypeComments.serviceTypeCommentId")), "commentCount"],
    ],
    where: itemTypeValue
      ? {
        type: {
          [Op.iLike]: `%${itemTypeValue}%`,
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

  // Convert image buffer and count to plain objects
  const convertedDatas = datas.map((item) => {
    const plain = item.get({ plain: true });

    if (plain.ServiceTypeImages && plain.ServiceTypeImages.length > 0) {
      plain.ServiceTypeImages = plain.ServiceTypeImages.map((img) => ({
        ...img,
        image: img.image ? img.image.toString("base64") : null,
      }));
    }

    return plain;
  });

  return convertedDatas;
};

// Get Service detail data by Id
const getServiceDetailById = async ({ id } = {}) => {
  const data = await ServiceTypeModel.findByPk(id, {
    include: [
      {
        model: ServiceTypeImageModel,
        attributes: ["image"],
      },
    ],
  });

  if (!data) return null;

  const convertedData = data.get({ plain: true });

  if (
    convertedData.ServiceTypeImages &&
    convertedData.ServiceTypeImages.length > 0
  ) {
    convertedData.ServiceTypeImages = convertedData.ServiceTypeImages.map(
      (img) => ({
        ...img,
        image: img.image ? img.image.toString("base64") : null,
      })
    );
  }

  return convertedData;
};

module.exports = {
  getServiceTypes,
  getServiceDetailById
};
