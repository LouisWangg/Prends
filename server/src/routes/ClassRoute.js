const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer(); // in-memory storage
const classController = require("../controllers/ClassController");

router.get("/getHomePageClasses", classController.getHomePageClasses);
router.put("/uploadImage/:id", upload.single("image"), classController.uploadImage); 

module.exports = router;
