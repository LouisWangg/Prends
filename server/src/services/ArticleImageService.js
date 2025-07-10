const ArticleImageModel = require("../models/ArticleImageModel");

// Upload image by id
const uploadImage = async ({ id, file } = {}) => {
  return await ArticleImageModel.create({
    articleId: id,
    image: file.buffer
  });
};

module.exports = {
  uploadImage
};
