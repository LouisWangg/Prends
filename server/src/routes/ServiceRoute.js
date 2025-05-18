const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/ServiceController");

router.post("/getHomePageServices", serviceController.getHomePageServices);

module.exports = router;
