const classModel = require("../models/ClassModel");

// Get Class datas for Home page
const getHomePageClasses = async () => {
    const datas = await classModel.findAll({
      attributes: [
        "classId",
        "name",
        "price",
        "discountFlag",
        "discountPrice",
        "itemType",
        "image",
      ],
      order: [["createdAt", "DESC"]],
      limit: 4,
    });

    // Map results to convert image buffer to base64 string
    const response = datas.map((item) => {
      const plain = item.get({ plain: true });
      plain.image = formatImages(plain.image);

      return plain;
    });

    return response;
};

// Get Class detail data by Id
const getClassDetailById = async ({ id } = {}) => {
    const data = await classModel.findByPk(id);

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    const convertedData = data.get({ plain: true });
    convertedData.image = formatImages(convertedData.image);

    return convertedData;
};

// Upload image by id
const uploadImage = async ({ id, file } = {}) => {

    // Upload an image for a specific class
    return await classModel.update(
      { image: file.buffer },
      { where: { classId: id } }
    );

};

const formatImages = (imageBuffer) => {
  return imageBuffer ? imageBuffer.toString("base64") : null;
};

module.exports = {
  getHomePageClasses,
  getClassDetailById,
  uploadImage
};
