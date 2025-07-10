const ServiceTypeService = require("../services/ServiceTypeService");

// Get Konseling Individu datas
const getIndividualCounselings = async (req, res) => {
  try {
    const datas = await ServiceTypeService.getIndividualCounselings();

    if (!datas) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json(datas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getIndividualCounselings");
  }
};

// Get Service detail data by Id
const getServiceDetailById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await ServiceTypeService.getServiceDetailById({ id });

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getServiceDetailById");
  }
};

module.exports = {
  getIndividualCounselings,
  getServiceDetailById
};
