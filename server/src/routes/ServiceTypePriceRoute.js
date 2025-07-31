import express from "express";
import * as ServiceTypePriceController from "../controllers/ServiceTypePriceController.js";

const router = express.Router();

router.get("/getServicePricingById/:id", ServiceTypePriceController.getServicePricingById);

export default router;
