const serviceTypeCommentService = require("../services/ServiceTypeCommentService");

const getHomePageComments = async (req, res) => {
  try {
    const result = await serviceTypeCommentService.getHomePageComments();
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getHomePageComments");
  }
};

const getServiceCommentsById = async (req, res) => {
  try {
    const { id } = req.params;
    const { sort } = req.query;

    const result = await serviceTypeCommentService.getServiceCommentsById({ id, sort });
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getServiceCommentsById");
  }
};

module.exports = {
  getHomePageComments,
  getServiceCommentsById
};
