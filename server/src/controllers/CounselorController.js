const { fn, literal } = require("sequelize");
const counselorModel = require("../models/CounselorModel");
const counselorImageModel = require("../models/CounselorImageModel");
const counselorFeedbackModel = require("../models/CounselorFeedbackModel");

// fn ==> to make a virtual column
// literal ==> because i want to order by a virtual column / raw SQL, not a model field, necessary when sorting counts, sums, etc

// Get Counselor datas for Home page
const getHomePageCounselors = async (req, res) => {
  try {
    const datas = await counselorModel.findAll({
      attributes: ["counselorId", "name", "price", "discountFlag", "discountPrice", "itemType", 
        [fn("COUNT", literal("DISTINCT CounselorFeedbackModels.counselorFeedbackId")), "feedBackCount"]
      ],
      include: [
        {
          model: counselorFeedbackModel,
          attributes: []
        },
        {
          model: counselorImageModel,
          attributes: ["image"],
          separate: true // run a separate subquery to fetch the related counselorImageModel records after the main query
        }],
      group: ["counselorModel.counselorId"],
      order: [[literal("feedBackCount"), "DESC"]],
      limit: 4
    });

    // Map results to convert image buffer to base64 string
    const response = datas.map(item => {
      const plain = item.get({ plain: true });

      if (plain.CounselorImages && plain.CounselorImages.length > 0) {
        // Assuming one image per serviceType, take the first image buffer
        plain.CounselorImages = plain.CounselorImages.map(img => ({
          ...img,
          image: img.image ? img.image.toString('base64') : null,
        }));
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
  getHomePageCounselors
};
