const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer(); // in-memory storage

const ServiceTypeImageController = require("../controllers/ServiceTypeImageController");

// using Multer middleware to process the file
router.post("/uploadImage/:id", upload.single("image"), ServiceTypeImageController.uploadImage); 

module.exports = router;
