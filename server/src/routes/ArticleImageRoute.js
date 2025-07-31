import express from "express";
import multer from "multer";
import ArticleImageController from "../controllers/ArticleImageController.js";

const router = express.Router();
const upload = multer();

//multer to process the file
router.post("/uploadImage/:id", upload.single("image"), ArticleImageController.uploadImage);

export default router;
