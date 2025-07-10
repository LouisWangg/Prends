const express = require("express");
const router = express.Router();
const counselorController = require("../controllers/CounselorController");

router.get("/getCounselors", counselorController.getCounselors);
router.get("/getCounselorDetailById/:id", counselorController.getCounselorDetailById);

module.exports = router;
