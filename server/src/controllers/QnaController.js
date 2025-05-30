const QnaModel = require("../models/QnaModel");

// Get Qna datas for Home page
const getHomePageQnas = async (req, res) => {
  try {
    const qnas = await QnaModel.findAll({
      order: [["qnaId", "ASC"]]
    });
    res.json(qnas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getHomePageQnas
};
