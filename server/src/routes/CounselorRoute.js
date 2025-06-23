const express = require("express");
const router = express.Router();
const CounselorController = require("../controllers/CounselorController");

router.get("/getHomePageCounselors", CounselorController.getHomePageCounselors);
router.get("/getCounselorDetailById/:id", CounselorController.getCounselorDetailById);

module.exports = router;
