import express from "express";
import CounselorPriceController from "../controllers/CounselorPriceController.js";

const router = express.Router();

router.get("/getCounselorPricingById/:id", CounselorPriceController.getCounselorPricingById);

export default router;
