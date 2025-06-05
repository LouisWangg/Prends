const { Op } = require("sequelize");
const ServiceTypeModel = require("../models/ServiceTypeModel");
const ServiceTypeImageModel = require("../models/ServiceTypeImageModel");

// Get Konseling Individu datas
const getIndividualCounselings = async (req, res) => {
  try {
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

    if (!datas) {
      return res.status(404).json({ message: "Data not found" });
    }

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

    res.json(convertedDatas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getIndividualCounselings");
  }
};

// Get Service detail data by Id
const getServiceDetailById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await ServiceTypeModel.findByPk(id, {
      include: [
        {
          model: ServiceTypeImageModel,
          attributes: ["image"],
        },
      ],
    });

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    const convertedData = data.get({ convertedData: true });

    if (convertedData.ServiceTypeImages && convertedData.ServiceTypeImages.length > 0) {
      convertedData.ServiceTypeImages = convertedData.ServiceTypeImages.map((img) => ({
        ...img,
        image: img.image ? img.image.toString("base64") : null,
      }));
    }

    res.json(convertedData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getServiceDetailById");
  }
};

module.exports = {
  getIndividualCounselings,
  getServiceDetailById
};
