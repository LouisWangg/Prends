const { Op } = require("sequelize");
const Sequelize = require("../config/database");
const SharedDescriptionModel = require("../models/SharedDescriptionModel");

// Get Description datas by Ids for Detail page 
const getDescriptionsByIds = async (req, res) => {
  try {
    const ids = req.query.ids?.split(',').map(Number) || [];

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
  getDescriptionsByIds
};
