const express = require("express");
const router = express.Router();
const FeedbackController = require("../controllers/FeedbackController");

router.get("/getHomePageFeedbacks", FeedbackController.getHomePageFeedbacks);

module.exports = router;
