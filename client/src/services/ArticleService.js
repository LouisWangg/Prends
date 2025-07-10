import axios from "axios";

const url = "http://localhost:5000/articles";

// Get 3 newest Article datas for Home page
export const fetchHomePageArticles = async () => {
  try {
    const response = await axios.get(`${url}/getHomePageArticles`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Article datas: `, error?.message || error);
    return null;
  }
};

// Get Article datas for Article page
export const fetchArticles = async () => {
  try {
    const response = await axios.get(`${url}/getArticles`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Article datas: `, error?.message || error);
    return null;
  }
};
