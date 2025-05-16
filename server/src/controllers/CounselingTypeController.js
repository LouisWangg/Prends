const { Op } = require("sequelize");
const CounselingType = require("../models/CounselingTypeModel");

// Get Card datas
const getHomePageTypes = async (req, res) => {
  try {
    const datas = await CounselingType.findAll({
        attributes: ['name', 'price', 'discountFlag', 'discountPrice'],
        where: {
          counselingTypeId: {
            [Op.gte]: 1,
            [Op.lte]: 4
          }
        }
    });
    res.json(datas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getHomePageTypes
};
