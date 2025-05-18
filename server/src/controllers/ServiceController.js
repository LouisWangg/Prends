const { Op } = require("sequelize");
const serviceModel = require("../models/ServiceModel");

// Get Card datas
const getHomePageServices = async (req, res) => {
  try {
    const datas = await serviceModel.findAll({
        attributes: ['name', 'price', 'discountFlag', 'discountPrice'],
        where: {
          ServiceId: {
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
  getHomePageServices
};
