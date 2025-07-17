const CounselorService = require("../services/CounselorService");

const getCounselors = async (req, res) => {
  try {
    const { itemType, sortBy, limit } = req.query;
    const datas = await CounselorService.getCounselors({ itemType, sortBy, limit });

    if (!datas) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json(datas);
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
