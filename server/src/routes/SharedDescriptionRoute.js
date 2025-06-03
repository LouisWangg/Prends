const express = require("express");
const router = express.Router();
const SharedDescriptionController = require("../controllers/SharedDescriptionController");

router.get("/getGeneralNotices", SharedDescriptionController.getGeneralNotices);
router.get("/getIndividualCounselingDescriptions", SharedDescriptionController.getIndividualCounselingDescriptions);

module.exports = router;
