import express from "express";
import multer from "multer";
import CounselorImageController from "../controllers/CounselorImageController.js";

const router = express.Router();
const upload = multer(); 

router.post("/uploadImage/:id", upload.single("image"), CounselorImageController.uploadImage); 
router.put("/updateImage/:id", upload.single("image"), CounselorImageController.updateImage); 

export default router;
