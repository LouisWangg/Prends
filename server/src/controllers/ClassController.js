import * as ClassService from "../services/ClassService.js";

export const getClasses = async (req, res) => {
  try {
    const { subType, sortBy, limit } = req.query;
    const response = await ClassService.getClasses({ subType, sortBy, limit });

    if (!response) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getClasses");
  }
};

export const getClassDetailById = async (req, res) => {
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

export const updateImage = async (req, res) => {
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
