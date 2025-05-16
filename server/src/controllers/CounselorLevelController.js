const counselorLevel = require("../models/CounselorLevelModel");

// Get Card datas
const getCounselorLevels = async (req, res) => {
  try {
    const datas = await counselorLevel.findAll({
        attributes: ['name', 'description']
    });
    res.json(datas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getCounselorLevels
};
