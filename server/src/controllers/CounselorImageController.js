const CounselorImageModel = require("../models/CounselorImageModel");

// Upload image by id
const uploadImage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.file) return res.status(400).send("No image file uploaded.");

    await CounselorImageModel.create({
      counselorId: id,
      image: req.file.buffer,
    });

    res.send("Counselor image uploaded successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  uploadImage
};
