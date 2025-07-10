const express = require("express");
const router = express.Router();
const serviceTypePriceController = require("../controllers/ServiceTypePriceController");

router.get("/getServicePricingById/:id", serviceTypePriceController.getServicePricingById);

module.exports = router;
