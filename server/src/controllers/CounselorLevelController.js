const counselorLevelModel = require("../models/CounselorLevelModel");

// Get Home Page datas
const getHomePageLevels = async (req, res) => {
  try {
    const datas = await counselorLevelModel.findAll({
        attributes: ['name']
    });
    res.json(datas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Get Level data
const getLevel = async (req, res) => {
  try {
    const { level } = req.params;
    const datas = await counselorLevelModel.findAll({
        attributes: ['name', 'description']
    });
    res.json(datas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Get Junior Page data
const getJuniorPageLevel = async (req, res) => {
  try {
    const datas = await counselorLevelModel.findAll({
        attributes: ['name', 'description']
    });
    res.json(datas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Get Middle Page data
const getMiddlePageLevel = async (req, res) => {
  try {
    const datas = await counselorLevelModel.findAll({
        attributes: ['name', 'description']
    });
    res.json(datas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Get Senior Page data
const getSeniorPageLevel = async (req, res) => {
  try {
    const datas = await counselorLevelModel.findAll({
        attributes: ['name', 'description']
    });
    res.json(datas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getHomePageLevels
};
