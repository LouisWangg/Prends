import ServiceTypeImageModel from "../models/ServiceTypeImageModel.js";

// Upload image by id
export const uploadImage = async ({ id, file } = {}) => {
  // Upload an image for a specific service type
  return await ServiceTypeImageModel.create({
    serviceTypeId: id,
    image: file.buffer,
  });
};

// Update image by id
export const updateImage = async ({ id, file } = {}) => {
  // Update an image for a specific service type
  return await ServiceTypeImageModel.update(
    { image: file.buffer },
    { where: { serviceTypeImageId: id } }
  );
};
