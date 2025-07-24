const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer(); // in-memory storage

const ClassController = require("../controllers/ClassController");

router.get("/getClasses", ClassController.getClasses);
router.get("/getClassDetailById/:id", ClassController.getClassDetailById);
router.put("/updateImage/:id", upload.single("image"), ClassController.updateImage); 

module.exports = router;
