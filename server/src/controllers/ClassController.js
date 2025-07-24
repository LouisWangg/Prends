const ClassService = require("../services/ClassService");

const getClasses = async (req, res) => {
  try {
    const { sortBy, limit } = req.query;
    const response = await ClassService.getClasses({ sortBy, limit });

    if (!response) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getClasses");
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

const updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { file } = req;

    if (!file) return res.status(400).send("No image file uploaded.");

    await ClassService.updateImage({ id, file });
    
    res.send("Class image uploaded successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on updateImage");
  }
};

module.exports = {
  getClasses,
  getClassDetailById,
  updateImage
};
