const express = require("express");
const router = express.Router();

const QnaController = require("../controllers/QnaController");

router.get("/getHomePageQnas", QnaController.getHomePageQnas);

module.exports = router;
