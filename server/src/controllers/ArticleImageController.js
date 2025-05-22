const articleImage = require("../models/ArticleImageModel");

// Upload image by id
const uploadImage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.file) return res.status(400).send("No image file uploaded.");

    // Upload an image for a specific service type
    await articleImage.create({
      articleId: id,
      image: req.file.buffer,
    });

    res.send("Article image uploaded successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  uploadImage
};
