const classModel = require("../models/ClassModel");

// Get Card datas
const getHomePageClasses = async (req, res) => {
  try {
    const datas = await classModel.findAll({
        attributes: ['name', 'price', 'discountFlag', 'discountPrice']
    });
    res.json(datas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getHomePageClasses
};
