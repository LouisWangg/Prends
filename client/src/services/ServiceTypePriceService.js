import { api } from "../api/Axios.js";

const url = "/serviceTypePrices";

// Get Service pricing data by Id
export const fetchServicePricingById = async (id) => {
  try {
    const response = await api.get(`${url}/getServicePricingById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Service pricing data by id: ${id}`, error?.message || error);
    return null;
  }
};
