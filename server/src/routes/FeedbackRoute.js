const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/FeedbackController");

router.get("/getHomePageFeedbacks", feedbackController.getHomePageFeedbacks);

module.exports = router;
