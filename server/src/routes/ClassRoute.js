const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer(); // in-memory storage

const ClassController = require("../controllers/ClassController");

router.get("/getHomePageClasses", ClassController.getHomePageClasses);
router.get("/getClassDetailById/:id", ClassController.getClassDetailById);
router.put("/uploadImage/:id", upload.single("image"), ClassController.uploadImage); 

module.exports = router;
