const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();
const ArticleImageController = require("../controllers/ArticleImageController");

// using Multer middleware to process the file
router.post("/uploadImage/:id", upload.single("image"), ArticleImageController.uploadImage); 

module.exports = router;
