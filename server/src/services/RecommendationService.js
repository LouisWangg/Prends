import { Op, Sequelize } from "sequelize";

import CounselorModel from "../models/CounselorModel.js";
import CounselorImageModel from "../models/CounselorImageModel.js";
import ServiceTypeModel from "../models/ServiceTypeModel.js";
import ServiceTypeImageModel from "../models/ServiceTypeImageModel.js";

import { convertImages } from "../utils/ConvertImage.js";

export const fetchServiceTypes = async ({ where, limit, sortRandom = true }) => {
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

export const fetchCounselors = async ({ where, limit, sortRandom = true }) => {
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

export const getServiceTypeAndSeniorCounselorRecommendations = async ({ excludeId, subType } = {}) => {
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
    where: { subType: "Senior" },
    limit: counselorLimit,
  });

  return [...serviceTypes, ...counselors];
};

export const getCounselorAndSeniorCounselorRecommendations = async ({ excludeId, subType }) => {
  const sameSubTypeCounselors = await fetchCounselors({
    where: {
      ...(subType && { subType }),
      ...(excludeId && { counselorId: { [Op.ne]: excludeId } }),
    },
    limit: 4,
    sortRandom: false,
  });

  if (sameSubTypeCounselors.length === 4) return sameSubTypeCounselors;

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

export const getServiceTypeAndFamilyRecommendations = async ({ excludeId, subType } = {}) => {
  const coupleTypes = await fetchServiceTypes({
    where: {
      ...(subType && { subType }),
      ...(excludeId && { serviceTypeId: { [Op.ne]: excludeId } }),
    },
    limit: 4,
  });

  if (coupleTypes.length === 4) return coupleTypes;

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

export const getDeboraAssessmentRecommendations = async ({ excludeId } = {}) => {
  const deboraFamilyTypes = await fetchServiceTypes({
    where: {
      name: { [Op.iLike]: `%debora%` },
      subType: "Keluarga",
      ...(excludeId && { serviceTypeId: { [Op.ne]: excludeId } }),
    },
    limit: 4,
  });

  if (deboraFamilyTypes.length === 4) return deboraFamilyTypes;

  const remaining = 4 - deboraFamilyTypes.length;

  const counselors = await fetchCounselors({ limit: remaining });

  const sortedCounselors = counselors.sort((a, b) => a.counselorId - b.counselorId);

  return [...deboraFamilyTypes, ...sortedCounselors];
};

export const getShanenClassRecommendations = async ({ excludeId } = {}) => {
  const shanenCoupleType = await fetchServiceTypes({
    where: {
      name: { [Op.iLike]: `%shanen%` },
      subType: "Pasangan",
      ...(excludeId && { serviceTypeId: { [Op.ne]: excludeId } }),
    },
    limit: 4,
  });

  if (shanenCoupleType.length === 4) return shanenCoupleType;

  const remaining = 4 - shanenCoupleType.length;

  const seniorCounselors = await fetchCounselors({
    where: { subType: "Senior" },
    limit: remaining,
  });

  const sortedCounselors = seniorCounselors.sort((a, b) => a.counselorId - b.counselorId);

  return [...shanenCoupleType, ...sortedCounselors];
};

export const getSeniorCounselorRecommendations = async () => {
  const seniorCounselors = await fetchCounselors({
    where: { subType: "Senior" },
    limit: 4,
  });

  return seniorCounselors;
};

export const getServiceTypeRecommendations = async ({ excludeId, subType }) => {
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
