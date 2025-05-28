const express = require("express");
const router = express.Router();
const ServiceTypeController = require("../controllers/ServiceTypeController");

router.get("/getIndividualCounselings", ServiceTypeController.getIndividualCounselings);
router.get("/getIndividualCounseling/:id", ServiceTypeController.getIndividualCounseling);

module.exports = router;
