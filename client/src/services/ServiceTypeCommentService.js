import axios from "axios";

const url = "http://localhost:5000/serviceTypeComments/";

// Get Comment datas for Home page
export const fetchHomePageComments = async () => {
  try {
    const response = await axios.get(`${url}/getHomePageComments`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch fetchHomePageComments datas: `, error);
    return null;
  }
};

// Get Comment datas for each Service
export const fetchServiceCommentsById = async (id) => {
  try {
    const response = await axios.get(`${url}/getServiceCommentsById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch fetchServiceCommentsById datas by id: ${id}`, error);
    return null;
  }
};
