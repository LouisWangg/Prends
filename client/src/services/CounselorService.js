import axios from "axios";

const url = "http://localhost:5000/counselors";

// Get Counselor datas for Home & List page
export const fetchCounselors = async ({ subType = null, sortBy = "commentCount", limit = null } = {}) => {
  try {
    const response = await axios.get(`${url}/getCounselors`, {
      params: { subType, sortBy, limit }
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Counselor datas: `, error?.message || error);
    return null;
  }
};

// Get Counselor detail data by ID
export const fetchCounselorDetailById = async (id) => {
  try {
    const response = await axios.get(`${url}/getCounselorDetailById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Counselor detail data by id: ${id}`, error?.message || error);
    return null;
  }
};
