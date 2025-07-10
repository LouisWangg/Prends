const express = require("express");
const router = express.Router();

const counselorCommentController = require("../controllers/CounselorCommentController");

router.get("/getCounselorCommentsById/:id", counselorCommentController.getCounselorCommentsById);

module.exports = router;
