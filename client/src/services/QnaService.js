import { api } from "../api/Axios.js";

const url = "/qnas";

// Get Qna datas for Home page
export const fetchHomePageQnas = async () => {
  try {
    const response = await api.get(`${url}/getHomePageQnas`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Qna datas: `, error?.message || error);
    return null;
  }
};
