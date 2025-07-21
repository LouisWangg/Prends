const ServiceTypeImageModel = require("../models/ServiceTypeImageModel");

// Upload image by id
const uploadImage = async ({ id, file } = {}) => {
  // Upload an image for a specific service type
  return await ServiceTypeImageModel.create({
    serviceTypeId: id,
    image: file.buffer
  });
};

// Update image by id
const updateImage = async ({ id, file } = {}) => {
  // Update an image for a specific service type
  return await ServiceTypeImageModel.update(
    { image: file.buffer },
    { where: { serviceTypeImageId: id } }
  );
};

module.exports = {
  uploadImage,
  updateImage,
};
