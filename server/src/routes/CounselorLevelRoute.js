const express = require("express");
const router = express.Router();
const counselorLevelController = require("../controllers/CounselorLevelController");

router.post("/getHomePageLevels", counselorLevelController.getHomePageLevels);
router.get("/getLevel/:level", counselorLevelController.getLevel);

module.exports = router;
