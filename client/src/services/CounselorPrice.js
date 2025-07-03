import axios from "axios";

const url = "http://localhost:5000/counselorPrices/";

// Get Counselor pricing data by Id
export const fetchCounselorPricingById = async (id) => {
  try {
    const response = await axios.get(`${url}/getCounselorPricingById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Counselor pricing data by id: ${id}`, error);
    return null;
  }
};
