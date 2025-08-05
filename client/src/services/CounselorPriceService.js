import { axiosInstance } from "./AxiosInstance.js";

const url = "/counselorPrices";

// Get Counselor pricing data by Id
export const fetchCounselorPricingById = async (id) => {
  try {
    const response = await axiosInstance.get(`${url}/getCounselorPricingById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Counselor pricing data by id: ${id}`, error?.message || error);
    return null;
  }
};
