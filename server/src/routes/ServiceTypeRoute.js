import express from "express";
import * as ServiceTypeController from "../controllers/ServiceTypeController.js";

const router = express.Router();

router.get("/getServiceTypes", ServiceTypeController.getServiceTypes);
router.get("/getServiceDetailById/:id", ServiceTypeController.getServiceDetailById);

export default router;
