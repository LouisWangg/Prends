import axios from "axios";

const url = "http://localhost:5000/recommendations/";

// Get combined Recommendation datas for Individual Konseling Detail Page
export const fetchIndividualCounselingRecommendations = async (excludeId, type) => {
  try {
    const response = await axios.get(`${url}/getIndividualCounselingRecommendations`, {
        params: { excludeId, type }
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Combined Recommendation datas for Individual Counseling: `, error);
    return null;
  }
};

// Get combined Recommendation datas for Counselor Detail Page
export const fetchCounselorRecommendations = async (excludeId, level) => {
  try {
    const response = await axios.get(`${url}/getCounselorRecommendations`, {
        params: { excludeId, level }
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Combined Recommendation datas for Counselor: `, error);
    return null;
  }
};
