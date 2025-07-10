import axios from "axios";

const url = "http://localhost:5000/qnas";

// Get Qna datas for Home page
export const fetchHomePageQnas = async () => {
  try {
    const response = await axios.get(`${url}/getHomePageQnas`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Qna datas: `, error?.message || error);
    return null;
  }
};
