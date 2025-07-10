const articleImageModel = require("../models/ArticleImageModel");

// Upload image by id
const uploadImage = async ({ id, file } = {}) => {

    return await articleImageModel.create({
      articleId: id,
      image: file.buffer
    });
    
};

module.exports = {
  uploadImage
};
