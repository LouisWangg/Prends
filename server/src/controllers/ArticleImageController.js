import * as ArticleImageService from "../services/ArticleImageService.js";

export const uploadImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { file } = req;

    if (!file) return res.status(400).send("No image file uploaded.");

    await ArticleImageService.uploadImage({ id, file });

    res.send("Article image uploaded successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
