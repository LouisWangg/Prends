const productModel = require("../models/ProductModel");

// Get Card datas
const getProducts = async (req, res) => {
  try {
    const datas = await productModel.findAll({
        attributes: ['productId', 'name', 'price', 'discountFlag', 'discountPrice']
    });
    res.json(datas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getProducts
};
