const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/FeedbackController");

router.post("/getHomePageFeedbacks", feedbackController.getHomePageFeedbacks);

module.exports = router;
