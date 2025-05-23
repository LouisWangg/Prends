const classModel = require("../models/ClassModel");

// Get Class datas for Home page
const getHomePageClasses = async (req, res) => {
  try {
    const datas = await classModel.findAll({
        attributes: ["name", "price", "discountFlag", "discountPrice", "itemType", "image"],
        order: [["createdAt", "DESC"]],
        limit: 4
    });

    // Map results to convert image buffer to base64 string
    const response = datas.map(item => {
      const plain = item.get({ plain: true });

      if (plain.image) {
        plain.image = plain.image.toString("base64");
      } else {
        plain.image = null;
      }

      return plain;
    });

    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getHomePageClasses
};
