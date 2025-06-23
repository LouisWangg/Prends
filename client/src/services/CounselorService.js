import axios from "axios";

const url = "http://localhost:5000/counselors/";

// Get Counselor datas for Home page
export const fetchHomePageCounselors = async () => {
  try {
    const response = await axios.get(`${url}/getHomePageCounselors`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Counselor datas: `, error);
    return null;
  }
};

// Get Counselor detail data by ID
export const fetchCounselorDetailById = async (id) => {
  try {
    const response = await axios.get(`${url}/getCounselorDetailById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Counselor detail data by id: ${id}`, error);
    return null;
  }
};

