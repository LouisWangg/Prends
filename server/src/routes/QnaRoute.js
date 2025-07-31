import express from "express";
import QnaController from "../controllers/QnaController.js";

const router = express.Router();

router.get("/getHomePageQnas", QnaController.getHomePageQnas);

export default router;
