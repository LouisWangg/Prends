const express = require("express");
const router = express.Router();

const SharedDescriptionController = require("../controllers/SharedDescriptionController");

router.get("/getDescriptionsAndNotices", SharedDescriptionController.getDescriptionsAndNotices);
router.get("/getTitlesAndSubtitles", SharedDescriptionController.getTitlesAndSubtitles);

module.exports = router;
