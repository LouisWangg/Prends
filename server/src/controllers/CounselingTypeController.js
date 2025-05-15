const CounselingType = require("../models/CounselingTypeModel");

// Get Card datas
const getCounselingTypes = async (req, res) => {
  try {
    const datas = await CounselingType.findAll({
        attributes: ['counselingTypeId', 'title']
    });
    res.json(datas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getCounselingTypes
};
