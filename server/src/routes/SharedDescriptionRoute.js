const express = require("express");
const router = express.Router();
const SharedDescriptionController = require("../controllers/SharedDescriptionController");

router.get("/getDescriptions/:type/:id", SharedDescriptionController.getDescriptions);

module.exports = router;
