import CounselorImageService from "../services/CounselorImageService.js";

export const uploadImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { file } = req;

    if (!file) return res.status(400).send("No image file uploaded.");

    await CounselorImageService.uploadImage({ id, file });

    res.send("Counselor image uploaded successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on uploadImage");
  }
};

export const updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { file } = req;

    if (!file) return res.status(400).send("No image file uploaded.");

    await CounselorImageService.updateImage({ id, file });
    res.send("Counselor image updated successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on updateImage");
  }
};
