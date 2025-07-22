const { Op, Sequelize } = require("sequelize");

const CounselorModel = require("../models/CounselorModel");
const CounselorImageModel = require("../models/CounselorImageModel");
const ServiceTypeModel = require("../models/ServiceTypeModel");
const ServiceTypeImageModel = require("../models/ServiceTypeImageModel");

const getIndividualCounselingRecommendations = async ({ excludeId, type } = {}) => {
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
        include: [{ model: ServiceTypeImageModel, attributes: ["image"] }],
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
            level: "Senior",
            ...(excludeId && { counselorId: { [Op.ne]: excludeId } }),
        },
        include: [{ model: CounselorImageModel, attributes: ["image"] }],
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
    return [...convertedServiceTypes, ...convertedCounselors];
};

const getCounselorRecommendations = async ({ excludeId, level }) => {
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
        include: [{ model: CounselorImageModel, attributes: ["image"] }],
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
    if (convertedSameLevelCounselors.length == 4) return convertedSameLevelCounselors;

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
        include: [{ model: CounselorImageModel, attributes: ["image"] }],
        order: Sequelize.literal("RANDOM()"),
        limit: remainingCounselors
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

    return [...convertedSameLevelCounselors, ...convertedSeniorCounselors];
};

const getCoupleAndFamilyRecommendations = async ({ excludeId, type } = {}) => {
    const coupleTypes = await ServiceTypeModel.findAll({
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
        include: [{ model: ServiceTypeImageModel, attributes: ["image"] }],
        order: Sequelize.literal("RANDOM()"),
        limit: 4,
    });

    const convertedCoupleTypes = coupleTypes.map((item) => {
        const plain = item.get({ plain: true });

        if (plain.ServiceTypeImages && plain.ServiceTypeImages.length > 0) {
            plain.ServiceTypeImages = plain.ServiceTypeImages.map((img) => ({
                ...img,
                image: img.image ? img.image.toString("base64") : null,
            }));
        }

        return plain;
    });

    if (convertedCoupleTypes.length == 4) return convertedCoupleTypes;

    const remainingServiceTypes = 4 - convertedCoupleTypes.length;

    const familyTypes = await ServiceTypeModel.findAll({
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
            type: "Keluarga",
            ...(excludeId && { serviceTypeId: { [Op.ne]: excludeId } }),
        },
        include: [{ model: ServiceTypeImageModel, attributes: ["image"] }],
        order: Sequelize.literal("RANDOM()"),
        limit: remainingServiceTypes
    });

    const convertedFamilyTypes = familyTypes.map((item) => {
        const plain = item.get({ plain: true });

        if (plain.ServiceTypeImages && plain.ServiceTypeImages.length > 0) {
            plain.ServiceTypeImages = plain.ServiceTypeImages.map((img) => ({
                ...img,
                image: img.image ? img.image.toString("base64") : null,
            }));
        }

        return plain;
    });

    return [...convertedCoupleTypes, ...convertedFamilyTypes];
};

const getAssessmentRecommendations = async ({ excludeId } = {}) => {
    const familyTypes = await ServiceTypeModel.findAll({
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
            type: "Keluarga",
            ...(excludeId && { serviceTypeId: { [Op.ne]: excludeId } }),
        },
        include: [{ model: ServiceTypeImageModel, attributes: ["image"] }],
        order: Sequelize.literal("RANDOM()"),
        limit: 4,
    });

    const convertedFamilyTypes = familyTypes.map((item) => {
        const plain = item.get({ plain: true });

        if (plain.ServiceTypeImages && plain.ServiceTypeImages.length > 0) {
            plain.ServiceTypeImages = plain.ServiceTypeImages.map((img) => ({
                ...img,
                image: img.image ? img.image.toString("base64") : null,
            }));
        }

        return plain;
    });

    if (convertedFamilyTypes.length == 4) return convertedFamilyTypes;

    const remainingCounselors = 4 - convertedFamilyTypes.length;

    const counselors = await CounselorModel.findAll({
        attributes: [
            "counselorId",
            "name",
            "price",
            "discountFlag",
            "discountPrice",
            "itemType"
        ],
        include: [{ model: CounselorImageModel, attributes: ["image"] }],
        order: Sequelize.literal("RANDOM()"),
        limit: remainingCounselors
    });

    // Step 2: Sort manually in JS
    const sortedCounselors = counselors.sort((a, b) => a.counselorId - b.counselorId);

    const convertedCounselors = sortedCounselors.map((item) => {
        const plain = item.get({ plain: true });

        if (plain.CounselorImages && plain.CounselorImages.length > 0) {
            plain.CounselorImages = plain.CounselorImages.map((img) => ({
                ...img,
                image: img.image ? img.image.toString("base64") : null,
            }));
        }

        return plain;
    });

    return [...convertedFamilyTypes, ...convertedCounselors];
};

const getSeniorCounselorRecommendations = async () => {
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
        },
        include: [{ model: CounselorImageModel, attributes: ["image"] }],
        order: Sequelize.literal("RANDOM()"),
        limit: 4,
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

    return [...convertedSeniorCounselors];
};

const getInterviewRecommendations = async ({ excludeId, type }) => {
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
        include: [{ model: ServiceTypeImageModel, attributes: ["image"] }],
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

    return [...convertedServiceTypes];
};


module.exports = {
    getIndividualCounselingRecommendations,
    getCounselorRecommendations,
    getCoupleAndFamilyRecommendations,
    getAssessmentRecommendations,
    getSeniorCounselorRecommendations,
    getInterviewRecommendations,
};
