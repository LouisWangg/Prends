const express = require("express");
const router = express.Router();
const counselorController = require("../controllers/CounselorController");

router.post("/getHomePageCounselors", counselorController.getHomePageCounselors);

module.exports = router;
