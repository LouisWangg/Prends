const express = require("express");
const router = express.Router();
const counselorLevelController = require("../controllers/CounselorLevelController");

router.post("/getHomePageLevels", counselorLevelController.getHomePageLevels);

module.exports = router;
