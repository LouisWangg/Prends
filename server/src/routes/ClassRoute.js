const express = require("express");
const router = express.Router();
const classController = require("../controllers/ClassController");

router.post("/getHomePageClasses", classController.getHomePageClasses);

module.exports = router;
