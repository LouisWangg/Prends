const { Op } = require("sequelize");
const ServiceTypeModel = require("../models/ServiceTypeModel");
const ServiceTypeImageModel = require("../models/ServiceTypeImageModel");

// Get Konseling Individu datas
const getIndividualCounselings = async (req, res) => {
  try {
    const datas = await ServiceTypeModel.findAll({
      attributes: ["serviceTypeId", "name", "price", "discountFlag", "discountPrice", "itemType", "type"],
      where: {
        type: {
          [Op.iLike]: "%individu%",
        },
      },
      include: [{
        model: ServiceTypeImageModel,
        attributes: ["image"], // specify the columns you want from the images table
      }],
    });

    // Map results to convert image buffer to base64 string
    const response = datas.map(item => {
      const plain = item.get({ plain: true });

      if (plain.ServiceTypeImages && plain.ServiceTypeImages.length > 0) {
        // Assuming one image per serviceType, take the first image buffer
        plain.ServiceTypeImages = plain.ServiceTypeImages.map(img => ({
          ...img,
          image: img.image ? img.image.toString('base64') : null,
        }));
      }

      return plain;
    });

    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Get Konseling Individu data by Id
const getIndividualCounseling = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await ServiceTypeModel.findByPk(id, {
      attributes: [
        "itemType",
        "name",
        "price",
        "discountFlag",
        "discountPrice",
        "duration",
        "description",
      ],
    });
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getIndividualCounselings,
  getIndividualCounseling
};
