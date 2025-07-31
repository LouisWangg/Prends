import express from "express";
import * as UserController from "../controllers/UserController.js";

const router = express.Router();

router.post("/registerUser", UserController.registerUser);
router.get("/loginUser", UserController.loginUser);
router.post("/insertUser", UserController.insertUser);
router.get("/getUsers", UserController.getUsers);
router.get("/getUser/:id", UserController.getUser);
router.put("/updateUser/:id", UserController.updateUser);
router.delete("/deleteUser/:id", UserController.deleteUser);

export default router;
