const express = require("express");
const router = express.Router();

const ServiceTypeController = require("../controllers/ServiceTypeController");

router.get("/getIndividualCounselings", ServiceTypeController.getIndividualCounselings);
router.get("/getServiceDetailById/:id", ServiceTypeController.getServiceDetailById);

module.exports = router;
