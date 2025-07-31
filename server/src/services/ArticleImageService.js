import ArticleImageModel from "../models/ArticleImageModel.js";

// Upload image by id
export const uploadImage = async ({ id, file } = {}) => {
  return await ArticleImageModel.create({
    articleId: id,
    image: file.buffer
  });
};
