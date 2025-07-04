const { Op, Sequelize } = require("sequelize");

const CounselorModel = require("../models/CounselorModel");
const CounselorImageModel = require("../models/CounselorImageModel");
const ServiceTypeModel = require("../models/ServiceTypeModel");
const ServiceTypeImageModel = require("../models/ServiceTypeImageModel");

const getIndividualCounselingRecommendations = async (req, res) => {
    try {
        const { excludeId, type } = req.query;

        const useThreeServices = Math.random() < 0.5;
        const serviceLimit = useThreeServices ? 3 : 2;
        const counselorLimit = useThreeServices ? 1 : 2;

        const serviceTypes = await ServiceTypeModel.findAll({
            attributes: [
                "serviceTypeId",
                "name",
                "price",
                "discountFlag",
                "discountPrice",
                "itemType",
                "type",
            ],
            where: {
                ...(type && { type }),
                ...(excludeId && { serviceTypeId: { [Op.ne]: excludeId } }),
            },
            include: [
                {
                    model: ServiceTypeImageModel,
                    attributes: ["image"],
                },
            ],
            order: [['serviceTypeId', 'ASC']], // ensure sorted order
            limit: serviceLimit,
        });

        const convertedServiceTypes = serviceTypes.map((item) => {
            const plain = item.get({ plain: true });

            if (plain.ServiceTypeImages && plain.ServiceTypeImages.length > 0) {
                // Assuming one image per serviceType, take the first image buffer
                plain.ServiceTypeImages = plain.ServiceTypeImages.map((img) => ({
                    ...img,
                    image: img.image ? img.image.toString("base64") : null,
                }));
            }

            return plain;
        });

        const counselors = await CounselorModel.findAll({
            attributes: [
                "counselorId",
                "name",
                "price",
                "discountFlag",
                "discountPrice",
                "itemType"
            ],
            where: {
                ...(excludeId && { counselorId: { [Op.ne]: excludeId } }),
            },
            include: [
                {
                    model: CounselorImageModel,
                    attributes: ["image"]
                }
            ],
            order: [Sequelize.literal('RANDOM()')],
            limit: counselorLimit
        });

        const convertedCounselors = counselors.map((item) => {
            const plain = item.get({ plain: true });

            if (plain.CounselorImages && plain.CounselorImages.length > 0) {
                // Assuming one image per serviceType, take the first image buffer
                plain.CounselorImages = plain.CounselorImages.map((img) => ({
                    ...img,
                    image: img.image ? img.image.toString("base64") : null,
                }));
            }

            return plain;
        });

        // No need to shuffle combined — services are first, counselors later
        const combined = [...convertedServiceTypes, ...convertedCounselors];

        res.json(combined);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error on getIndividualCounselingRecommendations");
    }
};

const getCounselorRecommendations = async (req, res) => {
    try {
        const { excludeId, level } = req.query;

        const sameLevelCounselors = await CounselorModel.findAll({
            attributes: [
                "counselorId",
                "name",
                "price",
                "discountFlag",
                "discountPrice",
                "itemType"
            ],
            where: {
                ...(level && { level }),
                ...(excludeId && { counselorId: { [Op.ne]: excludeId } }),
            },
            include: [
                {
                    model: CounselorImageModel,
                    attributes: ["image"]
                }
            ],
            order: [['counselorId', 'ASC']],
            limit: 4
        });

        const convertedSameLevelCounselors = sameLevelCounselors.map((item) => {
            const plain = item.get({ plain: true });

            if (plain.CounselorImages && plain.CounselorImages.length > 0) {
                plain.CounselorImages = plain.CounselorImages.map((img) => ({
                    ...img,
                    image: img.image ? img.image.toString("base64") : null,
                }));
            }

            return plain;
        });

        // If enough same-level counselors, return
        if (convertedSameLevelCounselors.length == 4) {
            return res.json(convertedSameLevelCounselors);
        }

        // Fill the remaining with senior-level counselors
        const remainingCounselors = 4 - convertedSameLevelCounselors.length;

        const seniorCounselors = await CounselorModel.findAll({
            attributes: [
                "counselorId",
                "name",
                "price",
                "discountFlag",
                "discountPrice",
                "itemType"
            ],
            where: {
                level: "Senior",
                ...(excludeId && { counselorId: { [Op.ne]: excludeId } }),
            },
            include: [
                {
                    model: CounselorImageModel,
                    attributes: ["image"],
                },
            ],
            order: Sequelize.literal("RANDOM()"),
            limit: remainingCounselors,
        });

        const convertedSeniorCounselors = seniorCounselors.map((item) => {
            const plain = item.get({ plain: true });

            if (plain.CounselorImages && plain.CounselorImages.length > 0) {
                plain.CounselorImages = plain.CounselorImages.map((img) => ({
                    ...img,
                    image: img.image ? img.image.toString("base64") : null,
                }));
            }

            return plain;
        });

        const combined = [...convertedSameLevelCounselors, ...convertedSeniorCounselors];
        res.json(combined);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error on getCounselorRecommendations");
    }
};

module.exports = {
    getIndividualCounselingRecommendations,
    getCounselorRecommendations
};
