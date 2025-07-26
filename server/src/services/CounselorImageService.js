const CounselorImageModel = require("../models/CounselorImageModel");

// Upload image by id
const uploadImage = async ({ id, file } = {}) => {
  return await CounselorImageModel.create({
    counselorId: id,
    image: file.buffer
  });
};

// Update image by id
const updateImage = async ({ id, file } = {}) => {
  // Update an image for a specific counselor
  return await CounselorImageModel.update(
    { image: file.buffer },
    { where: { counselorImageId: id } }
  );
};

module.exports = {
  uploadImage,
  updateImage,
};
