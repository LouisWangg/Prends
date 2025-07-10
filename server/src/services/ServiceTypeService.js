const { Op } = require("sequelize");

const ServiceTypeModel = require("../models/ServiceTypeModel");
const ServiceTypeImageModel = require("../models/ServiceTypeImageModel");

// Get Konseling Individu datas
const getIndividualCounselings = async () => {
  const datas = await ServiceTypeModel.findAll({
    attributes: [
      "serviceTypeId",
      "name",
      "price",
      "discountFlag",
      "discountPrice",
      "itemType",
      "type",
    ],
    where: {
      type: {
        [Op.iLike]: "%individu%",
      },
    },
    include: [
      {
        model: ServiceTypeImageModel,
        attributes: ["image"], // specify the columns you want from the images table
      },
    ],
  });

  if (!datas) return null;

  // Map results to convert image buffer to base64 string
  const convertedDatas = datas.map((item) => {
    const plain = item.get({ plain: true });

    if (plain.ServiceTypeImages && plain.ServiceTypeImages.length > 0) {
      // Assuming one image per serviceType, take the first image buffer
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
  getIndividualCounselings,
  getServiceDetailById
};
