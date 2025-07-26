const { Op, Sequelize } = require("sequelize");

const CounselorModel = require("../models/CounselorModel");
const CounselorImageModel = require("../models/CounselorImageModel");
const ServiceTypeModel = require("../models/ServiceTypeModel");
const ServiceTypeImageModel = require("../models/ServiceTypeImageModel");

const { convertImages } = require("../utils/ConvertImage");

const fetchServiceTypes = async ({ where, limit, sortRandom = true }) => {
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
        where,
        include: [
            {
                model: ServiceTypeImageModel,
                attributes: ["serviceTypeImageId", "image"],
                separate: true,
                order: [["serviceTypeImageId", "ASC"]],
            },
        ],
        order: sortRandom ? Sequelize.literal("RANDOM()") : [["serviceTypeId", "ASC"]],
        limit,
    });

    return convertImages(serviceTypes, "ServiceTypeImages");
};

const fetchCounselors = async ({ where, limit, sortRandom = true }) => {
    const counselors = await CounselorModel.findAll({
        attributes: [
            "counselorId",
            "name",
            "price",
            "discountFlag",
            "discountPrice",
            "type",
        ],
        where,
        include: [
            {
                model: CounselorImageModel,
                attributes: ["counselorImageId", "image"],
                separate: true,
                order: [["counselorImageId", "ASC"]],
            },
        ],
        order: sortRandom ? Sequelize.literal("RANDOM()") : [["counselorId", "ASC"]],
        limit,
    });

    return convertImages(counselors, "CounselorImages");
};

const getServiceTypeAndSeniorCounselorRecommendations = async ({ excludeId, subType } = {}) => {
    const useThreeServices = Math.random() < 0.5;
    const serviceLimit = useThreeServices ? 3 : 2;
    const counselorLimit = useThreeServices ? 1 : 2;

    const serviceTypes = await fetchServiceTypes({
        where: {
            ...(subType && { subType }),
            ...(excludeId && { serviceTypeId: { [Op.ne]: excludeId } }),
        },
        limit: serviceLimit,
        sortRandom: false,
    });

    const counselors = await fetchCounselors({
        where: {
            subType: "Senior",
        },
        limit: counselorLimit,
    });

    return [...serviceTypes, ...counselors];
};

const getCounselorAndSeniorCounselorRecommendations = async ({ excludeId, subType }) => {
    const sameSubTypeCounselors = await fetchCounselors({
        where: {
            ...(subType && { subType }),
            ...(excludeId && { counselorId: { [Op.ne]: excludeId } }),
        },
        limit: 4,
        sortRandom: false,
    });

    // If enough same-subType counselors, return
    if (sameSubTypeCounselors.length == 4) return sameSubTypeCounselors;

    // Fill the remaining with senior-subType counselors
    const remaining = 4 - sameSubTypeCounselors.length;

    const seniorCounselors = await fetchCounselors({
        where: {
            subType: "Senior",
            ...(excludeId && { counselorId: { [Op.ne]: excludeId } }),
        },
        limit: remaining,
    });

    return [...sameSubTypeCounselors, ...seniorCounselors];
};

const getServiceTypeAndFamilyRecommendations = async ({ excludeId, subType } = {}) => {
    const coupleTypes = await fetchServiceTypes({
        where: {
            ...(subType && { subType }),
            ...(excludeId && { serviceTypeId: { [Op.ne]: excludeId } }),
        },
        limit: 4,
    });

    if (coupleTypes.length == 4) return coupleTypes;

    const remaining = 4 - coupleTypes.length;

    const familyTypes = await fetchServiceTypes({
        where: {
            subType: "Keluarga",
            ...(excludeId && { serviceTypeId: { [Op.ne]: excludeId } }),
        },
        limit: remaining,
    });

    return [...coupleTypes, ...familyTypes];
};

const getDeboraAssessmentRecommendations = async ({ excludeId } = {}) => {
    const deboraFamilyTypes = await fetchServiceTypes({
        where: {
            name: { [Op.iLike]: `%debora%` },
            subType: "Keluarga",
            ...(excludeId && { serviceTypeId: { [Op.ne]: excludeId } }),
        },
        limit: 4,
    });

    if (deboraFamilyTypes.length == 4) return deboraFamilyTypes;

    const remaining = 4 - deboraFamilyTypes.length;

    const counselors = await fetchCounselors({
        limit: remaining,
    });

    // Step 2: Sort manually in JS
    const sortedCounselors = counselors.sort((a, b) => a.counselorId - b.counselorId);

    return [...deboraFamilyTypes, ...sortedCounselors];
};

const getShanenClassRecommendations = async ({ excludeId } = {}) => {
    const shanenCoupleType = await fetchServiceTypes({
        where: {
            name: {
                [Op.iLike]: `%shanen%`
            },
            subType: "Pasangan",
            ...(excludeId && { serviceTypeId: { [Op.ne]: excludeId } }),
        },
        limit: 4,
    });

    if (shanenCoupleType.length == 4) return shanenCoupleType;

    const remaining = 4 - shanenCoupleType.length;

    const seniorCounselors = await fetchCounselors({
        where: {
            subType: "Senior"
        },
        limit: remaining,
    });

    // Step 2: Sort manually in JS
    const sortedCounselors = seniorCounselors.sort((a, b) => a.counselorId - b.counselorId);

    return [...shanenCoupleType, ...sortedCounselors];
};

const getSeniorCounselorRecommendations = async () => {
    const seniorCounselors = await fetchCounselors({
        where: {
            subType: "Senior",
        },
        limit: 4,
    });

    return seniorCounselors;
};

const getServiceTypeRecommendations = async ({ excludeId, subType }) => {
    const serviceTypes = await fetchServiceTypes({
        where: {
            ...(subType && { subType }),
            ...(excludeId && { serviceTypeId: { [Op.ne]: excludeId } }),
        },
        limit: 4,
        sortRandom: false,
    });

    return serviceTypes;
};

module.exports = {
    getServiceTypeAndSeniorCounselorRecommendations,
    getCounselorAndSeniorCounselorRecommendations,
    getServiceTypeAndFamilyRecommendations,
    getDeboraAssessmentRecommendations,
    getShanenClassRecommendations,
    getSeniorCounselorRecommendations,
    getServiceTypeRecommendations,
};
