const ServiceTypeService = require("../services/ServiceTypeService");

// Get Service Type datas according to type
const getServiceTypes = async (req, res) => {
  try {
    const { type, sortBy } = req.query;
    const datas = await ServiceTypeService.getServiceTypes({ type, sortBy });

    if (!datas) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json(datas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getServiceTypes");
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
  getServiceTypes,
  getServiceDetailById
};
