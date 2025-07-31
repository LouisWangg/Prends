import express from "express";
import multer from "multer";
import ServiceTypeImageController from "../controllers/ServiceTypeImageController.js";

const router = express.Router();
const upload = multer(); // in-memory storage

// using Multer middleware to process the file
router.post("/uploadImage/:id", upload.single("image"), ServiceTypeImageController.uploadImage);
router.put("/updateImage/:id", upload.single("image"), ServiceTypeImageController.updateImage);

export default router;
