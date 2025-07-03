const { Op } = require("sequelize");
const CounselorPriceModel = require("../models/CounselorPriceModel");

// Get Counselor pricing data by Id
const getCounselorPricingById = async (req, res) => {
    try {
        const { id } = req.params;
        const datas = await CounselorPriceModel.findAll({
            where: { counselorId: id },
            order: [["counselorPriceId", "ASC"]]
        });

        if (!datas) {
            return res.status(404).json({ message: "Data not found" });
        }

        res.json(datas);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error on getCounselorPricingById");
    }
};

module.exports = {
    getCounselorPricingById
};
