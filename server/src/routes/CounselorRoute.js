const express = require("express");
const router = express.Router();
const counselorController = require("../controllers/CounselorController");

router.get("/getHomePageCounselors", counselorController.getHomePageCounselors);

module.exports = router;
