import axios from "axios";

const url = "http://localhost:5000/recommendations/";

// Get combined Recommendation datas for Individual Konseling Detail Page
export const fetchCombinedRecommendations = async (excludeId, type) => {
  try {
    const response = await axios.get(`${url}/getCombinedRecommendations`, {
        params: {excludeId, type}
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Combined Recommendation datas: `, error);
    return null;
  }
};
