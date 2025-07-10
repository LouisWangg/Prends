const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer();

const articleImageController = require("../controllers/ArticleImageController");

// using Multer middleware to process the file
router.post("/uploadImage/:id", upload.single("image"), articleImageController.uploadImage); 

module.exports = router;
