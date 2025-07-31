import express from "express";
import CounselorCommentController from "../controllers/CounselorCommentController.js";

const router = express.Router();

router.get("/getCounselorCommentsById/:id", CounselorCommentController.getCounselorCommentsById);

export default router;
