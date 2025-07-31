import ServiceTypePriceService from "../services/ServiceTypePriceService.js";

export const getServicePricingById = async (req, res) => {
  try {
    const { id } = req.params;
    const datas = await ServiceTypePriceService.getServicePricingById({ id });

    if (!datas || datas.length === 0) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json(datas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getServicePricingById");
  }
};
