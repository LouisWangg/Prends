const express = require("express");
const router = express.Router();
const serviceTypeController = require("../controllers/ServiceTypeController");

router.post("/getIndividualCounselings", serviceTypeController.getIndividualCounselings);
router.post("/getIndividualCounseling/:id", serviceTypeController.getIndividualCounseling);

module.exports = router;
