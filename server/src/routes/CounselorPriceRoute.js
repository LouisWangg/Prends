const express = require("express");
const router = express.Router();
const counselorPriceController = require("../controllers/CounselorPriceController");

router.get("/getCounselorPricingById/:id", counselorPriceController.getCounselorPricingById);

module.exports = router;
