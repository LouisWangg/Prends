const express = require("express");
const router = express.Router();
const ServiceTypePriceController = require("../controllers/ServiceTypePriceController");

router.get("/getServicePricingById/:id", ServiceTypePriceController.getServicePricingById);

module.exports = router;
