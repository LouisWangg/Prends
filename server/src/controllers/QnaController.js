const QnaService = require("../services/QnaService");

// Get Qna datas for Home page
const getHomePageQnas = async (req, res) => {
  try {
    const qnas = await QnaService.getHomePageQnas();
    res.json(qnas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getHomePageQnas");
  }
};

module.exports = {
  getHomePageQnas
};
