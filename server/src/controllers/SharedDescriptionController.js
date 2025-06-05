const { Op } = require("sequelize");
const Sequelize = require("../config/database");
const SharedDescriptionModel = require("../models/SharedDescriptionModel");

// Get Description datas for Detail page 
const getDescriptions = async (req, res) => {
  try {
    const { type, id } = req.params;
    let ids = [];

    if (type.includes("service") && (id > 1 && id <= 4)) {
      ids.push(1, 2, 3);
    } else if (type.includes("class")) {

    } else if (type.includes("counselor")) {

    }

    const orderClause = [
      Sequelize.literal(`CASE "sharedDescriptionId" ${ids.map((id, index) => `WHEN ${id} THEN ${index}`).join(' ')
        } ELSE ${ids.length} END`)
    ];

    const descriptions = await SharedDescriptionModel.findAll({
      attributes: ["sharedDescriptionId", "title", "description"],
      where: {
        sharedDescriptionId: {
          [Op.in]: ids
        }
      },
      order: orderClause
    });

    res.json(descriptions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Failed to run getDescriptionByIds");
  }
};

module.exports = {
  getDescriptions
};
