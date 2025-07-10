const { Op } = require("sequelize");

const CounselorPriceModel = require("../models/CounselorPriceModel");

// Get Counselor pricing data by Id
const getCounselorPricingById = async ({ id } = {}) => {
  const datas = await CounselorPriceModel.findAll({
    where: { counselorId: id },
    order: [["counselorPriceId", "ASC"]]
  });

  return datas;
};

module.exports = {
  getCounselorPricingById
};
