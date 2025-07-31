import express from "express";
import * as ServiceTypeCommentController from "../controllers/ServiceTypeCommentController.js";

const router = express.Router();

router.get("/getHomePageComments", ServiceTypeCommentController.getHomePageComments);
router.get("/getServiceCommentsById/:id", ServiceTypeCommentController.getServiceCommentsById);

export default router;
