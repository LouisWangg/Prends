const ClassModel = require("../models/ClassModel");

// Get Class datas for Home page
const getHomePageClasses = async (req, res) => {
  try {
    const datas = await ClassModel.findAll({
      attributes: [
        "classId",
        "name",
        "price",
        "discountFlag",
        "discountPrice",
        "itemType",
        "image",
      ],
      order: [["createdAt", "DESC"]],
      limit: 4,
    });

    // Map results to convert image buffer to base64 string
    const response = datas.map((item) => {
      const plain = item.get({ plain: true });

      plain.image = plain.image ? plain.image.toString("base64") : null;

      return plain;
    });

    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Upload image by id
const uploadImage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.file) return res.status(400).send("No image file uploaded.");

    // Upload an image for a specific class
    await ClassModel.update(
      { image: req.file.buffer },
      { where: { classId: id }}
    );

    res.send("Class image uploaded successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getHomePageClasses,
  uploadImage,
};
