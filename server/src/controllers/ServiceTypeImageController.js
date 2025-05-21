const { Op } = require("sequelize");
const ServiceTypeImage = require("../models/ServiceTypeImageModel");

// Upload image by id
const uploadImage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.file) return res.status(400).send("No image file uploaded.");

    // Upload an image for a specific service type
    await ServiceTypeImage.create({
      serviceTypeId: id,
      image: req.file.buffer,
    });

    res.send("User image uploaded successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  uploadImage
};
