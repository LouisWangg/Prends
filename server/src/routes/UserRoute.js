import express from "express";
import { authenticateToken } from "../middlewares/AuthenticateToken.js";
import * as UserController from "../controllers/UserController.js";

const router = express.Router();

router.post("/registerUser", UserController.registerUser);
router.post("/loginUser", UserController.loginUser);
router.post("/refreshToken", UserController.refreshAccessToken);
router.post("/logoutUser", UserController.logoutUser);

router.post("/insertUser", authenticateToken, UserController.insertUser);
router.get("/getUsers", authenticateToken, UserController.getUsers);
router.get("/getUser/:id", authenticateToken, UserController.getUser);
router.put("/updateUser/:id", authenticateToken, UserController.updateUser);
router.delete("/deleteUser/:id", authenticateToken, UserController.deleteUser);

export default router;
