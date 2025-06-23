import axios from "axios";

const url = "http://localhost:5000/classes/";

// Get Class datas for Home page
export const fetchHomePageClasses = async () => {
  try {
    const response = await axios.get(`${url}/getHomePageClasses`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Class datas: `, error);
    return null;
  }
};

// Get Class detail data by ID
export const fetchClassDetailById = async (id) => {
  try {
    const response = await axios.get(`${url}/getClassDetailById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Class detail data by id: ${id}`, error);
    return null;
  }
};
