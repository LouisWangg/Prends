const CounselorCommentService = require("../services/CounselorCommentService");

const getCounselorCommentsById = async (req, res) => {
  try {
    const { id } = req.params;
    const { sort } = req.query;

    const response = await CounselorCommentService.getCounselorCommentsById({ id, sort });

    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on running getCounselorCommentsById");
  }
};

module.exports = {
  getCounselorCommentsById
};
