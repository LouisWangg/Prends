import express from "express";
import multer from "multer";
import ClassController from "../controllers/ClassController.js";

const router = express.Router();
const upload = multer(); // in-memory storage

router.get("/getClasses", ClassController.getClasses);
router.get("/getClassDetailById/:id", ClassController.getClassDetailById);
router.put("/updateImage/:id", upload.single("image"), ClassController.updateImage);

export default router;
