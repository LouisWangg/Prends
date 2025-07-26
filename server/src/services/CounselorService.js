const { Op, fn, col, literal } = require("sequelize");

const sequelize = require("../config/database");

const CounselorModel = require("../models/CounselorModel");
const CounselorImageModel = require("../models/CounselorImageModel");

const { convertImages } = require("../utils/ConvertImage");

// fn ==> to make a virtual column
// literal ==> because i want to order by a virtual column / raw SQL, not a model field, necessary when sorting counts, sums, etc

const getCounselors = async ({ subType = null, sortBy = "commentCount", limit = null } = {}) => {
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
        where: subType
            ? {
                subType: {
                    [Op.iLike]: `%${subType}%`,
                },
            } : undefined,
        include: [
            {
                model: CounselorImageModel,
                attributes: ["counselorImageId", "image"],
                separate: true,
                order: [["counselorImageId", "ASC"]],
            },
        ],
        order: orderClause,
        limit: limit ? parseInt(limit) : undefined,
    });

    // Convert image buffers to base64
    return convertImages(counselors, "CounselorImages");
};

// Get Counselor detail data by Id
const getCounselorDetailById = async ({ id } = {}) => {
    try {
        const data = await CounselorModel.findByPk(id, {
            include: [{ model: CounselorImageModel, attributes: ["image"] }],
        });

        if (!data) return null;

        return convertImages(data, "CounselorImages");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error on getCounselorDetailById");
    }
};

module.exports = {
    getCounselors,
    getCounselorDetailById
};
