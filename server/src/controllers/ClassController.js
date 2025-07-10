const ClassService = require("../services/ClassService");

const getHomePageClasses = async (req, res) => {
  try {
    const response = await ClassService.getHomePageClasses();
    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getHomePageClasses");
  }
};

const getClassDetailById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await ClassService.getClassDetailById({ id });

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }
    
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getClassDetailById");
  }
};

const uploadImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { file } = req;

    if (!file) return res.status(400).send("No image file uploaded.");

    await ClassService.uploadImage({ id, file });
    
    res.send("Class image uploaded successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on uploadImage");
  }
};

module.exports = {
  getHomePageClasses,
  getClassDetailById,
  uploadImage
};
