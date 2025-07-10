const CounselorImageModel = require("../models/CounselorImageModel");

// Upload image by id
const uploadImage = async ({ id, file } = {}) => {
  return await CounselorImageModel.create({
    counselorId: id,
    image: file.buffer
  });
};

module.exports = {
  uploadImage
};
