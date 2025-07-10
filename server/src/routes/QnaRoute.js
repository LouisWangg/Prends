const express = require("express");
const router = express.Router();
const qnaController = require("../controllers/QnaController");

router.get("/getHomePageQnas", qnaController.getHomePageQnas);

module.exports = router;
