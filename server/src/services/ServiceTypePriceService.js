const { Op } = require("sequelize");

const ServiceTypePriceModel = require("../models/ServiceTypePriceModel");

// Get Service pricing data by Id
const getServicePricingById = async ({ id } = {}) => {
  return await ServiceTypePriceModel.findAll({
    where: { serviceTypeId: id },
    order: [["serviceTypePriceId", "ASC"]],
  });
};

module.exports = {
  getServicePricingById
};
