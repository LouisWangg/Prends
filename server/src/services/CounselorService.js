const sequelize = require("../config/database");

const CounselorModel = require("../models/CounselorModel");
const CounselorImageModel = require("../models/CounselorImageModel");

// fn ==> to make a virtual column
// literal ==> because i want to order by a virtual column / raw SQL, not a model field, necessary when sorting counts, sums, etc

// Get Counselor datas for Home & List page
const getCounselors = async ({ sortBy = "commentCount", limit = null } = {}) => {
    let orderClause = "";
    const limitClause = limit ? `LIMIT ${parseInt(limit)}` : "";

    switch (sortBy) {
        case "price_asc":
            orderClause = `ORDER BY c."price" ASC`;
            break;
        case "price_desc":
            orderClause = `ORDER BY c."price" DESC`;
            break;
        case "name_asc":
            orderClause = `ORDER BY c."name" ASC`;
            break;
        case "name_desc":
            orderClause = `ORDER BY c."name" DESC`;
            break;
        default:
            orderClause = `ORDER BY "commentCount" DESC`;
    }

    const [counselors] = await sequelize.query(`
      SELECT 
        c."counselorId",
        c."name",
        c."price",
        c."discountFlag",
        c."discountPrice",
        c."itemType",
        COUNT(cf."counselorCommentId") AS "commentCount"
      FROM "Counselors" c
      LEFT JOIN "CounselorComments" cf ON cf."counselorId" = c."counselorId"
      GROUP BY 
        c."counselorId",
        c."name",
        c."price",
        c."discountFlag",
        c."discountPrice",
        c."itemType"
      ${orderClause}
      ${limitClause}
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

    return counselors.map(c => ({
        ...c,
        CounselorImages: imageMap[c.counselorId] || []
    }));
};

// Get Counselor detail data by Id
const getCounselorDetailById = async ({ id } = {}) => {
    try {
        const data = await CounselorModel.findByPk(id, {
            include: [{ model: CounselorImageModel, attributes: ["image"] }],
        });

        if (!data) return null;

        const converted = data.get({ plain: true });
        converted.CounselorImages = (converted.CounselorImages || []).map((img) => ({
            ...img,
            image: img.image ? img.image.toString("base64") : null,
        }));

        return converted;
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error on getCounselorDetailById");
    }
};

module.exports = {
    getCounselors,
    getCounselorDetailById
};
