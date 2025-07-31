import express from "express";
import SharedDescriptionController from "../controllers/SharedDescriptionController.js";

const router = express.Router();

router.get("/getDescriptionsAndNotices", SharedDescriptionController.getDescriptionsAndNotices);
router.get("/getTitlesAndSubtitles", SharedDescriptionController.getTitlesAndSubtitles);

export default router;
