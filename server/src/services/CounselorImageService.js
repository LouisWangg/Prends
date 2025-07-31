import CounselorImageModel from "../models/CounselorImageModel.js";

// Upload image by id
export const uploadImage = async ({ id, file } = {}) => {
  return await CounselorImageModel.create({
    counselorId: id,
    image: file.buffer,
  });
};

// Update image by id
export const updateImage = async ({ id, file } = {}) => {
  return await CounselorImageModel.update(
    { image: file.buffer },
    { where: { counselorImageId: id } }
  );
};
