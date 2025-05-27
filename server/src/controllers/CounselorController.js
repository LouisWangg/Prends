const sequelize = require("../config/database");
const { fn, literal, col } = require("sequelize");
const counselorModel = require("../models/CounselorModel");
const counselorImageModel = require("../models/CounselorImageModel");
const counselorFeedbackModel = require("../models/CounselorFeedbackModel");

// fn ==> to make a virtual column
// literal ==> because i want to order by a virtual column / raw SQL, not a model field, necessary when sorting counts, sums, etc

// Get Counselor datas for Home page
const getHomePageCounselors = async (req, res) => {
  try {
    const [counselors] = await sequelize.query(`
      SELECT 
        c."counselorId",
        c."name",
        c."price",
        c."discountFlag",
        c."discountPrice",
        c."itemType",
        COUNT(f."counselorFeedbackId") AS "feedbackCount"
      FROM "Counselors" c
      LEFT JOIN "CounselorFeedbacks" f ON f."counselorId" = c."counselorId"
      GROUP BY 
        c."counselorId",
        c."name",
        c."price",
        c."discountFlag",
        c."discountPrice",
        c."itemType"
      ORDER BY "feedbackCount" DESC
      LIMIT 4
    `);

    // Fetch images separately
    const counselorIds = counselors.map(c => c.counselorId);
    const counselorImages = await sequelize.query(`
      SELECT "counselorId", "image"
      FROM "CounselorImages"
      WHERE "counselorId" IN (:ids)
    `, {
      replacements: { ids: counselorIds },
      type: sequelize.QueryTypes.SELECT
    });

    // Attach images to each counselor and convert to base64
    const imageMap = counselorImages.reduce((acc, img) => {
      if (!acc[img.counselorId]) acc[img.counselorId] = [];
      acc[img.counselorId].push({
        ...img,
        image: img.image ? img.image.toString("base64") : null
      });
      return acc;
    }, {});

    const response = counselors.map(c => ({
      ...c,
      CounselorImages: imageMap[c.counselorId] || []
    }));

    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getHomePageCounselors,
};
