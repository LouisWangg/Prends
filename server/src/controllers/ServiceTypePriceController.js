const { Op } = require("sequelize");
const ServiceTypePriceModel = require("../models/ServiceTypePriceModel");

// Get Service pricing data by Id
const getServicePricingById = async (req, res) => {
    try {
        const { id } = req.params;
        const datas = await ServiceTypePriceModel.findAll({
            where: { serviceTypeId: id },
            order: [["serviceTypePriceId", "ASC"]]
        });

        if (!datas) {
            return res.status(404).json({ message: "Data not found" });
        }

        res.json(datas);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error on getServicePricingById");
    }
};

module.exports = {
    getServicePricingById
};
