const { Op } = require("sequelize");
const counselorPriceModel = require("../models/CounselorPriceModel");

// Get Counselor pricing data by Id
const getCounselorPricingById = async ({ id } = {}) => {
    
    const datas = await counselorPriceModel.findAll({
        where: { counselorId: id },
        order: [["counselorPriceId", "ASC"]]
    });

    return datas;
};

module.exports = {
    getCounselorPricingById
};
