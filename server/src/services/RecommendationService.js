const { Op, Sequelize } = require("sequelize");

const { convertImages } = require("../utils/ConvertImage");

const CounselorModel = require("../models/CounselorModel");
const CounselorImageModel = require("../models/CounselorImageModel");
const ServiceTypeModel = require("../models/ServiceTypeModel");
const ServiceTypeImageModel = require("../models/ServiceTypeImageModel");

const getIndividualCounselingRecommendations = async ({ excludeId, subType } = {}) => {
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
            "type",
            "subType",
        ],
        where: {
            ...(subType && { subType }),
            ...(excludeId && { serviceTypeId: { [Op.ne]: excludeId } }),
        },
        include: [{ model: ServiceTypeImageModel, attributes: ["image"] }],
        order: [['serviceTypeId', 'ASC']], // ensure sorted order
        limit: serviceLimit,
    });

    const convertedServiceTypes = convertImages(serviceTypes, "ServiceTypeImages");

    const counselors = await CounselorModel.findAll({
        attributes: [
            "counselorId",
            "name",
            "price",
            "discountFlag",
            "discountPrice",
            "type"
        ],
        where: {
            subType: "Senior",
            ...(excludeId && { counselorId: { [Op.ne]: excludeId } }),
        },
        include: [{ model: CounselorImageModel, attributes: ["image"] }],
        order: [Sequelize.literal('RANDOM()')],
        limit: counselorLimit
    });

    const convertedCounselors = convertImages(counselors, "CounselorImages");

    // No need to shuffle combined — services are first, counselors later
    return [...convertedServiceTypes, ...convertedCounselors];
};

const getCounselorRecommendations = async ({ excludeId, subType }) => {
    const sameSubTypeCounselors = await CounselorModel.findAll({
        attributes: [
            "counselorId",
            "name",
            "price",
            "discountFlag",
            "discountPrice",
            "type"
        ],
        where: {
            ...(subType && { subType }),
            ...(excludeId && { counselorId: { [Op.ne]: excludeId } }),
        },
        include: [{ model: CounselorImageModel, attributes: ["image"] }],
        order: [['counselorId', 'ASC']],
        limit: 4
    });

    const convertedSameSubTypeCounselors = convertImages(sameSubTypeCounselors, "CounselorImages");

    // If enough same-subType counselors, return
    if (convertedSameSubTypeCounselors.length == 4) return convertedSameSubTypeCounselors;

    // Fill the remaining with senior-subType counselors
    const remainingCounselors = 4 - convertedSameSubTypeCounselors.length;

    const seniorCounselors = await CounselorModel.findAll({
        attributes: [
            "counselorId",
            "name",
            "price",
            "discountFlag",
            "discountPrice",
            "type"
        ],
        where: {
            subType: "Senior",
            ...(excludeId && { counselorId: { [Op.ne]: excludeId } }),
        },
        include: [{ model: CounselorImageModel, attributes: ["image"] }],
        order: Sequelize.literal("RANDOM()"),
        limit: remainingCounselors
    });

    const convertedSeniorCounselors = convertImages(seniorCounselors, "CounselorImages");

    return [...convertedSameSubTypeCounselors, ...convertedSeniorCounselors];
};

const getCoupleAndFamilyRecommendations = async ({ excludeId, subType } = {}) => {
    const coupleTypes = await ServiceTypeModel.findAll({
        attributes: [
            "serviceTypeId",
            "name",
            "price",
            "discountFlag",
            "discountPrice",
            "type",
            "subType",
        ],
        where: {
            ...(subType && { subType }),
            ...(excludeId && { serviceTypeId: { [Op.ne]: excludeId } }),
        },
        include: [{ model: ServiceTypeImageModel, attributes: ["image"] }],
        order: Sequelize.literal("RANDOM()"),
        limit: 4,
    });

    const convertedCoupleTypes = convertImages(coupleTypes, "ServiceTypeImages");

    if (convertedCoupleTypes.length == 4) return convertedCoupleTypes;

    const remainingServiceTypes = 4 - convertedCoupleTypes.length;

    const familyTypes = await ServiceTypeModel.findAll({
        attributes: [
            "serviceTypeId",
            "name",
            "price",
            "discountFlag",
            "discountPrice",
            "type",
            "subType",
        ],
        where: {
            subType: "Keluarga",
            ...(excludeId && { serviceTypeId: { [Op.ne]: excludeId } }),
        },
        include: [{ model: ServiceTypeImageModel, attributes: ["image"] }],
        order: Sequelize.literal("RANDOM()"),
        limit: remainingServiceTypes
    });

    const convertedFamilyTypes = convertImages(serviceTypes, "ServiceTypeImages");

    return [...convertedCoupleTypes, ...convertedFamilyTypes];
};

const getDeboraAssessmentRecommendations = async ({ excludeId } = {}) => {
    const familyTypes = await ServiceTypeModel.findAll({
        attributes: [
            "serviceTypeId",
            "name",
            "price",
            "discountFlag",
            "discountPrice",
            "type",
            "subType",
        ],
        where: {
            name: {
                [Op.iLike]: `%debora%`
            },
            subType: "Keluarga",
            ...(excludeId && { serviceTypeId: { [Op.ne]: excludeId } }),
        },
        include: [{ model: ServiceTypeImageModel, attributes: ["image"] }],
        order: Sequelize.literal("RANDOM()"),
        limit: 4,
    });

    const convertedFamilyTypes = convertImages(serviceTypes, "ServiceTypeImages");

    if (convertedFamilyTypes.length == 4) return convertedFamilyTypes;

    const remainingCounselors = 4 - convertedFamilyTypes.length;

    const counselors = await CounselorModel.findAll({
        attributes: [
            "counselorId",
            "name",
            "price",
            "discountFlag",
            "discountPrice",
            "type"
        ],
        include: [{ model: CounselorImageModel, attributes: ["image"] }],
        order: Sequelize.literal("RANDOM()"),
        limit: remainingCounselors
    });

    // Step 2: Sort manually in JS
    const sortedCounselors = counselors.sort((a, b) => a.counselorId - b.counselorId);

    const convertedCounselors = convertImages(sortedCounselors, "CounselorImages");

    return [...convertedFamilyTypes, ...convertedCounselors];
};



const getShanenClassRecommendations = async ({ excludeId } = {}) => {
    const coupleTypes = await ServiceTypeModel.findAll({
        attributes: [
            "serviceTypeId",
            "name",
            "price",
            "discountFlag",
            "discountPrice",
            "type",
            "subType",
        ],
        where: {
            name: {
                [Op.iLike]: `%shanen%`
            },
            subType: "Pasangan",
            ...(excludeId && { serviceTypeId: { [Op.ne]: excludeId } }),
        },
        include: [{ model: ServiceTypeImageModel, attributes: ["image"] }],
        order: Sequelize.literal("RANDOM()"),
        limit: 4,
    });

    const convertedCoupleTypes = convertImages(coupleTypes, "ServiceTypeImages");

    if (convertedCoupleTypes.length == 4) return convertedCoupleTypes;

    const remainingCounselors = 4 - convertedCoupleTypes.length;

    const counselors = await CounselorModel.findAll({
        attributes: [
            "counselorId",
            "name",
            "price",
            "discountFlag",
            "discountPrice",
            "type"
        ],
        where: {
            subType: "Senior"
        },
        include: [{ model: CounselorImageModel, attributes: ["image"] }],
        order: Sequelize.literal("RANDOM()"),
        limit: remainingCounselors
    });

    // Step 2: Sort manually in JS
    const sortedCounselors = counselors.sort((a, b) => a.counselorId - b.counselorId);

    const convertedCounselors = convertImages(sortedCounselors, "CounselorImages");

    return [...convertedCoupleTypes, ...convertedCounselors];
};

const getSeniorCounselorRecommendations = async () => {
    const seniorCounselors = await CounselorModel.findAll({
        attributes: [
            "counselorId",
            "name",
            "price",
            "discountFlag",
            "discountPrice",
            "type"
        ],
        where: {
            subType: "Senior",
        },
        include: [{ model: CounselorImageModel, attributes: ["image"] }],
        order: Sequelize.literal("RANDOM()"),
        limit: 4,
    });

    const convertedSeniorCounselors = convertImages(seniorCounselors, "CounselorImages");

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
            "type",
            "subType",
        ],
        where: {
            ...(subType && { subType }),
            ...(excludeId && { serviceTypeId: { [Op.ne]: excludeId } }),
        },
        include: [{ model: ServiceTypeImageModel, attributes: ["image"] }],
        order: [['serviceTypeId', 'ASC']], // ensure sorted order
        limit: serviceLimit,
    });

    const convertedServiceTypes = convertImages(serviceTypes, "ServiceTypeImages");

    return [...convertedServiceTypes];
};

module.exports = {
    getIndividualCounselingRecommendations,
    getCounselorRecommendations,
    getCoupleAndFamilyRecommendations,
    getDeboraAssessmentRecommendations,
    getSeniorCounselorRecommendations,
    getInterviewRecommendations,
};
