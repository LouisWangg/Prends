const express = require("express");
const router = express.Router();
const SharedDescriptionController = require("../controllers/SharedDescriptionController");

router.get("/getDescriptionsByIds", SharedDescriptionController.getDescriptionsByIds);

module.exports = router;
