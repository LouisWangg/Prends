const CounselorService = require("../services/CounselorService");

const getCounselors = async (req, res) => {
  try {
    const { sortBy, limit } = req.query;
    const data = await CounselorService.getCounselors({ sortBy, limit });
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getCounselors");
  }
};

const getCounselorDetailById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await CounselorService.getCounselorDetailById({ id });

    if (!data) return res.status(404).json({ message: "Data not found on getCounselorDetailById" });

    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getCounselorDetailById");
  }
};

module.exports = {
  getCounselors,
  getCounselorDetailById
};
