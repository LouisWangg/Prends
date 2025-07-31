import { Op } from "sequelize";
import CounselorPriceModel from "../models/CounselorPriceModel.js";

// Get Counselor pricing data by Id
export const getCounselorPricingById = async ({ id } = {}) => {
  const datas = await CounselorPriceModel.findAll({
    where: { counselorId: id },
    order: [["counselorPriceId", "ASC"]],
  });

  return datas;
};
