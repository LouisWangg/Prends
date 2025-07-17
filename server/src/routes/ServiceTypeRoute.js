const express = require("express");
const router = express.Router();

const ServiceTypeController = require("../controllers/ServiceTypeController");

router.get("/getServiceTypes", ServiceTypeController.getServiceTypes);
router.get("/getServiceDetailById/:id", ServiceTypeController.getServiceDetailById);

module.exports = router;
