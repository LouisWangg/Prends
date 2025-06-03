const { Op } = require("sequelize");
const SharedDescriptionModel = require("../models/SharedDescriptionModel");


// Get general Notice used by all detail page
const getGeneralNotices = async (req, res) => {
  try {
    const descriptions = await SharedDescriptionModel.findAll({
      attributes: ["sharedDescriptionId", "title", "description"],
      where: {
        sharedDescriptionId: {
            [Op.in]: []
        }
      },
      order: [["sharedDescriptionId", "ASC"]]
    });

    res.json(descriptions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Failed to run getIndividualCounselingDescriptions");
  }
};

// Get Konseling Individu descriptions
const getIndividualCounselingDescriptions = async (req, res) => {
  try {
    const descriptions = await SharedDescriptionModel.findAll({
      attributes: ["sharedDescriptionId", "title", "description"],
      where: {
        sharedDescriptionId: {
            [Op.in]: []
        }
      },
      order: [["sharedDescriptionId", "ASC"]]
    });

    res.json(descriptions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Failed to run getIndividualCounselingDescriptions");
  }
};

module.exports = {
  getGeneralNotices,
  getIndividualCounselingDescriptions
};
