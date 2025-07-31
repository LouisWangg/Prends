import express from "express";
import ServiceTypePriceController from "../controllers/ServiceTypePriceController.js";

const router = express.Router();

router.get("/getServicePricingById/:id", ServiceTypePriceController.getServicePricingById);

export default router;
