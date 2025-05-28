const express = require("express");
const router = express.Router();
const ServiceTypeFeedbackController = require("../controllers/ServiceTypeFeedbackController");

router.get("/getHomePageFeedbacks", ServiceTypeFeedbackController.getHomePageFeedbacks);

module.exports = router;
