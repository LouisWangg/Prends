const express = require("express");
const router = express.Router();
const sharedDescriptionController = require("../controllers/SharedDescriptionController");

router.get("/getDescriptionsAndNotices/:type/:id", sharedDescriptionController.getDescriptionsAndNotices);

module.exports = router;
