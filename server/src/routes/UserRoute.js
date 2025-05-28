const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/registerUser", UserController.registerUser);
router.get("/loginUser", UserController.loginUser);
router.post("/insertUser", UserController.insertUser);
router.get("/getUsers", UserController.getUsers);
router.get("/getUser/:id", UserController.getUser);
router.put("/updateUser/:id", UserController.updateUser);
router.delete("/deleteUser/:id", UserController.deleteUser);

module.exports = router;
