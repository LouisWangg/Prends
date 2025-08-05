import { axiosInstance } from "./AxiosInstance.js";

const url = "/recommendations";

// Get combined Recommendation datas for Individual Konseling Detail Page
export const fetchServiceTypeAndSeniorCounselorRecommendations = async (excludeId, subType) => {
  try {
    const response = await axiosInstance.get(`${url}/getServiceTypeAndSeniorCounselorRecommendations`, {
        params: { excludeId, subType }
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Combined Recommendation datas for Individual Counseling: `, error?.message || error);
    return null;
  }
};

// Get combined Recommendation datas for Counselor Detail Page
export const fetchCounselorAndSeniorCounselorRecommendations = async (excludeId, subType) => {
  try {
    const response = await axiosInstance.get(`${url}/getCounselorAndSeniorCounselorRecommendations`, {
        params: { excludeId, subType }
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Combined Recommendation datas for Counselor: `, error?.message || error);
    return null;
  }
};
