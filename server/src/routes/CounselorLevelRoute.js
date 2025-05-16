const express = require("express");
const router = express.Router();
const counselorLevelController = require("../controllers/CounselorLevelController");

router.post("/getCounselorLevels", counselorLevelController.getCounselorLevels);

module.exports = router;
