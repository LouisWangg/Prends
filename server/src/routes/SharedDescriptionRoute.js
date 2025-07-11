const express = require("express");
const router = express.Router();

const SharedDescriptionController = require("../controllers/SharedDescriptionController");

router.get("/getDescriptionsAndNotices", SharedDescriptionController.getDescriptionsAndNotices);

module.exports = router;
