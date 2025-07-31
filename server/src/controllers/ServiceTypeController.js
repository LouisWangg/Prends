import * as ServiceTypeService from "../services/ServiceTypeService.js";

// Get Service Type datas according to type
export const getServiceTypes = async (req, res) => {
  try {
    const { subType, sortBy } = req.query;
    const datas = await ServiceTypeService.getServiceTypes({ subType, sortBy });

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
export const getServiceDetailById = async (req, res) => {
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
