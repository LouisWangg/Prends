const { Op } = require("sequelize");
const serviceTypeModel = require("../models/ServiceTypeModel");

// Get Konseling Individu datas 
const getIndividualCounselings = async (req, res) => {
  try {
    const datas = await serviceTypeModel.findAll({
        attributes: ['name', 'price', 'discountFlag', 'discountPrice'],
        where: { 
          type: {
            [Op.iLike]: '%individu%'
          }
        }
    });
    res.json(datas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Get Konseling Individu data by Id 
const getIndividualCounseling = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await serviceTypeModel.findByPk(id, {
        attributes: ['itemType', 'name', 'price', 'discountFlag', 'discountPrice', 'duration', 'description']
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
