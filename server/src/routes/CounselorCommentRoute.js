const express = require("express");
const router = express.Router();

const CounselorCommentController = require("../controllers/CounselorCommentController");

router.get("/getCounselorCommentsById/:id", CounselorCommentController.getCounselorCommentsById);

module.exports = router;
