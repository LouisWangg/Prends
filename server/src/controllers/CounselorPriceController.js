import CounselorPriceService from "../services/CounselorPriceService.js";

export const getCounselorPricingById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await CounselorPriceService.getCounselorPricingById({ id });

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getCounselorPricingById");
  }
};
