const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.post("/insertUser", userController.insertUser);
router.get("/getUsers", userController.getUsers);
router.get("/getUser/:id", userController.getUser);
router.put("/updateUser/:id", userController.updateUser);
router.delete("/deleteUser/:id", userController.deleteUser);

module.exports = router;
