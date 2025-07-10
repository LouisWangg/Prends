const express = require("express");
const router = express.Router();
const serviceTypeCommentController = require("../controllers/ServiceTypeCommentController");

router.get("/getHomePageComments", serviceTypeCommentController.getHomePageComments);
router.get("/getServiceCommentsById/:id", serviceTypeCommentController.getServiceCommentsById);

module.exports = router;
