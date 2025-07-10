const ServiceTypeImageModel = require("../models/ServiceTypeImageModel");

// Upload image by id
const uploadImage = async ({ id, file } = {}) => {
  // Upload an image for a specific service type
  return await ServiceTypeImageModel.create({
    serviceTypeId: id,
    image: file.buffer
  });
};

module.exports = {
  uploadImage
};
