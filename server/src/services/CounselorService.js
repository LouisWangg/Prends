const sequelize = require("../config/database");

const { Op, fn, col, literal } = require("sequelize");
const CounselorModel = require("../models/CounselorModel");
const CounselorImageModel = require("../models/CounselorImageModel");

// fn ==> to make a virtual column
// literal ==> because i want to order by a virtual column / raw SQL, not a model field, necessary when sorting counts, sums, etc

const getCounselors = async ({ itemType = null, sortBy = "commentCount", limit = null } = {}) => {
    const whereClause = {};
    const itemTypeValue = itemType ? itemType.charAt(0).toUpperCase() + itemType.slice(1) : null;

    const finalPriceLiteral = literal(`
        CASE 
        WHEN "discountFlag" = true AND "discountPrice" > 0 
        THEN "discountPrice" 
        ELSE "price" 
        END
    `);

    const commentCountLiteral = literal(`(
        SELECT COUNT(*) FROM "CounselorComments" 
        WHERE "CounselorComments"."counselorId" = "Counselor"."counselorId" 
    )`);

    if (itemTypeValue) {
        whereClause.level = itemTypeValue;
    }

    let orderClause;
    switch (sortBy) {
        case "commentCount":
            orderClause = [[commentCountLiteral, "DESC"]];
            break;
        case "price_asc":
            orderClause = [[finalPriceLiteral, "ASC"]];
            break;
        case "price_desc":
            orderClause = [[finalPriceLiteral, "DESC"]];
            break;
        case "name_asc":
            orderClause = [["name", "ASC"]];
            break;
        case "name_desc":
            orderClause = [["name", "DESC"]];
            break;
        default:
            orderClause = [[commentCountLiteral, "DESC"]];
    }

    const counselors = await CounselorModel.findAll({
        attributes: {
            include: [
                [commentCountLiteral, "commentCount"],
            ],
        },
        where: whereClause,
        include: [
            {
                model: CounselorImageModel,
                attributes: ["image"],
            },
        ],
        order: orderClause,
        limit: limit ? parseInt(limit) : undefined,
    });

    // Convert image buffers to base64
    return counselors.map((c) => {
        const plain = c.get({ plain: true });
        plain.CounselorImages = (plain.CounselorImages || []).map((img) => ({
            ...img,
            image: img.image ? img.image.toString("base64") : null,
        }));
        return plain;
    });
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
