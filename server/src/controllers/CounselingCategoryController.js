const CounselingCategory = require("../models/CounselingCategoryModel");

// Get Card datas
const getCounselingCategories = async (req, res) => {
  try {
    const datas = await CounselingCategory.findAll({
        attributes: ['counselingCategoryId', 'name', 'price', 'discountFlag', 'discountPrice']
    });
    res.json(datas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getCounselingCategories
};
