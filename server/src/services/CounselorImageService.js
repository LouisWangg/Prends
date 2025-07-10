const counselorImageModel = require("../models/CounselorImageModel");

// Upload image by id
const uploadImage = async ({ id, file } = {}) => {

    return await counselorImageModel.create({
      counselorId: id,
      image: file.buffer
    });

};

module.exports = {
  uploadImage
};
