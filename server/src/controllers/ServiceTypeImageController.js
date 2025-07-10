const ServiceTypeImageService = require("../services/ServiceTypeImageService");

const uploadImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { file } = req;

    if (!file) return res.status(400).send("No image file uploaded.");

    await ServiceTypeImageService.uploadImage({ id, file });
    res.send("Service type image uploaded successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on uploadImage");
  }
};

module.exports = {
  uploadImage
};
