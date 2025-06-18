const express = require("express");
const router = express.Router();
const ServiceTypeCommentController = require("../controllers/ServiceTypeCommentController");

router.get("/getHomePageComments", ServiceTypeCommentController.getHomePageComments);
router.get("/getServiceCommentsById/:id", ServiceTypeCommentController.getServiceCommentsById);

module.exports = router;
