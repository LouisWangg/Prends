import express from "express";
import * as CounselorController from "../controllers/CounselorController.js";

const router = express.Router();

router.get("/getCounselors", CounselorController.getCounselors);
router.get("/getCounselorDetailById/:id", CounselorController.getCounselorDetailById);

export default router;
