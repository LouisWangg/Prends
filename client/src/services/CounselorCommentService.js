import { api } from "../api/Axios.js";

const url = "/counselorComments";

// Get Comment datas for Counselor Detail page
export const fetchCounselorCommentsById = async ({ id, sort = "newest" } = {}) => {
  try {
    const response = await api.get(`${url}/getCounselorCommentsById/${id}`, {
      params: { sort }
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch fetchCounselorCommentsById datas by id: ${id}`, error?.message || error);
    return null;
  }
};
