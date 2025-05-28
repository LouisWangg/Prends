const express = require("express");
const router = express.Router();
const CounselorController = require("../controllers/CounselorController");

router.get("/getHomePageCounselors", CounselorController.getHomePageCounselors);

module.exports = router;
