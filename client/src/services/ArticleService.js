import { api } from "../api/Axios.js";

const url = "/articles";

// Get 3 newest Article datas for Home page
export const fetchHomePageArticles = async () => {
  try {
    const response = await api.get(`${url}/getHomePageArticles`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Article datas: `, error?.message || error);
    return null;
  }
};

// Get Article datas for Article page
export const fetchArticles = async () => {
  try {
    const response = await api.get(`${url}/getArticles`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Article datas: `, error?.message || error);
    return null;
  }
};
