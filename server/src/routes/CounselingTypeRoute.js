const express = require("express");
const router = express.Router();
const counselingTypeController = require("../controllers/CounselingTypeController");

router.post("/getHomePageTypes", counselingTypeController.getHomePageTypes);

module.exports = router;
