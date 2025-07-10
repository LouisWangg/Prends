const QnaModel = require("../models/QnaModel");

// Get Qna datas for Home page
const getHomePageQnas = async () => {
  return await QnaModel.findAll({
    order: [["qnaId", "ASC"]]
  });
};

module.exports = {
  getHomePageQnas
};
