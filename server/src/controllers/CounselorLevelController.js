const counselorLevelModel = require("../models/CounselorLevelModel");

// Get Card datas
const getHomePageLevels = async (req, res) => {
  try {
    const datas = await counselorLevelModel.findAll({
        attributes: ['name']
    });
    res.json(datas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getHomePageLevels
};
