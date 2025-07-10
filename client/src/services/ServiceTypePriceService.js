import axios from "axios";

const url = "http://localhost:5000/serviceTypePrices";

// Get Service pricing data by Id
export const fetchServicePricingById = async (id) => {
  try {
    const response = await axios.get(`${url}/getServicePricingById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Service pricing data by id: ${id}`, error?.message || error);
    return null;
  }
};
