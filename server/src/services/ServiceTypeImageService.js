const serviceTypeImageModel = require("../models/ServiceTypeImageModel");

// Upload image by id
const uploadImage = async ({ id, file } = {}) => {

    // Upload an image for a specific service type
    return await serviceTypeImageModel.create({
      serviceTypeId: id,
      image: file.buffer
    });

};

module.exports = {
  uploadImage
};
