const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer(); // in-memory storage

const serviceTypeImageController = require("../controllers/ServiceTypeImageController");

// using Multer middleware to process the file
router.post("/uploadImage/:id", upload.single("image"), serviceTypeImageController.uploadImage); 

module.exports = router;
