const { Op } = require("sequelize");

const serviceTypePriceModel = require("../models/ServiceTypePriceModel");

// Get Service pricing data by Id
const getServicePricingById = async ({ id } = {}) => {
    
        return await serviceTypePriceModel.findAll({
            where: { serviceTypeId: id },
            order: [["serviceTypePriceId", "ASC"]]
        });

};

module.exports = {
    getServicePricingById
};
