const express = require("express");
const router = express.Router();

const SharedDescriptionController = require("../controllers/SharedDescriptionController");

router.get("/getDescriptionsAndNotices/:type/:id", SharedDescriptionController.getDescriptionsAndNotices);

module.exports = router;
