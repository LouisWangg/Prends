const { Op } = require("sequelize");
const multer = require('multer');
const upload = multer();  // in-memory storage
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

// Upload image by id
const uploadImage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.file) return res.status(400).send("No image file uploaded.");

    // Find user by primary key
    const data = await serviceTypeModel.findByPk(id);
    if (!data) return res.status(404).send("User not found");

    // Save image buffer (bytea) to DB
    await serviceTypeModel.update(
      { image: req.file.buffer },
      { where: { serviceTypeId: id } }
    );

    res.send("User image uploaded successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getIndividualCounselings,
  getIndividualCounseling
};
