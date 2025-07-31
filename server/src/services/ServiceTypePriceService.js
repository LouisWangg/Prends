import { Op } from "sequelize";
import ServiceTypePriceModel from "../models/ServiceTypePriceModel.js";

// Get Service pricing data by Id
export const getServicePricingById = async ({ id } = {}) => {
  return await ServiceTypePriceModel.findAll({
    where: { serviceTypeId: id },
    order: [["serviceTypePriceId", "ASC"]],
  });
};
