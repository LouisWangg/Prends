const express = require("express");
const router = express.Router();
const serviceTypeController = require("../controllers/ServiceTypeController");

router.get("/getIndividualCounselings", serviceTypeController.getIndividualCounselings);
router.get("/getIndividualCounseling/:id", serviceTypeController.getIndividualCounseling);

module.exports = router;
