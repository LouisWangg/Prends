const express = require("express");
const router = express.Router();
const serviceTypeFeedbackController = require("../controllers/ServiceTypeFeedbackController");

router.get("/getHomePageFeedbacks", serviceTypeFeedbackController.getHomePageFeedbacks);

module.exports = router;
