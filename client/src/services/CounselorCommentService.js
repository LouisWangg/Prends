import axios from "axios";

const url = "http://localhost:5000/counselorComments";

// Get Comment datas for Counselor Detail page
export const fetchCounselorCommentsById = async (id, sort) => {
  try {
    const response = await axios.get(`${url}/getCounselorCommentsById/${id}`, {
      params: { sort }
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch fetchCounselorCommentsById datas by id: ${id}`, error?.message || error);
    return null;
  }
};
