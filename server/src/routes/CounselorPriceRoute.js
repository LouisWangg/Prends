const express = require("express");
const router = express.Router();

const CounselorPriceController = require("../controllers/CounselorPriceController");

router.get("/getCounselorPricingById/:id", CounselorPriceController.getCounselorPricingById);

module.exports = router;
