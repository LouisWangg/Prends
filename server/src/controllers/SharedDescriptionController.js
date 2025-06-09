const { Op } = require("sequelize");
const Sequelize = require("../config/database");
const SharedDescriptionModel = require("../models/SharedDescriptionModel");

// Get Description and Notice datas for Detail page 
const getDescriptionsAndNotices = async (req, res) => {
  try {
    const { type, id } = req.params;
    let descriptionIds, noticeIds = [];

    if (type.includes("service") && (id => 1 && id <= 4)) {
      descriptionIds.push(8, 9, 10, 11);
      noticeIds.push(1, 2, 3);
    } else if (type.includes("class")) {

    } else if (type.includes("counselor")) {

    }

    const orderClause = (ids) => [
        Sequelize.literal(`CASE "sharedDescriptionId" ${ids.map((id, i) => `WHEN ${id} THEN ${i}`).join(" ")} ELSE ${ids.length} END`)
    ];

    // Query both in parallel
    const [descriptions, notices] = await Promise.all([
      SharedDescriptionModel.findAll({
        attributes: ["sharedDescriptionId", "title", "description"],
        where: { sharedDescriptionId: { [Op.in]: descriptionIds } },
        order: orderClause(descriptionIds)
      }),
      SharedDescriptionModel.findAll({
        attributes: ["sharedDescriptionId", "title", "description"],
        where: { sharedDescriptionId: { [Op.in]: noticeIds } },
        order: orderClause(noticeIds)
      })
    ]);

    res.json({ descriptions, notices });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Failed to run getDescriptionByIds");
  }
};

module.exports = {
  getDescriptionsAndNotices
};
