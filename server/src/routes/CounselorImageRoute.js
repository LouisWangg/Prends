const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer(); 
const CounselorImageController = require("../controllers/CounselorImageController");

// using Multer middleware to process the file
router.post("/uploadImage/:id", upload.single("image"), CounselorImageController.uploadImage); 

module.exports = router;
