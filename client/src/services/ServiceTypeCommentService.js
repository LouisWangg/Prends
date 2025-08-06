import { api } from "../api/Axios.js";

const url = "/serviceTypeComments";

// Get Comment datas for Home page
export const fetchHomePageComments = async () => {
  try {
    const response = await api.get(`${url}/getHomePageComments`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch fetchHomePageComments datas: `, error?.message || error);
    return null;
  }
};

// Get Comment datas for each Service
export const fetchServiceCommentsById = async ({ id, sort = "newest" } = {}) => {
  try {
    const response = await api.get(`${url}/getServiceCommentsById/${id}`, {
      params: { sort }
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch fetchServiceCommentsById datas by id: ${id}`, error?.message || error);
    return null;
  }
};
