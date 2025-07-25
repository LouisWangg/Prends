import axios from "axios";

const url = "http://localhost:5000/classes";

// Get Class datas for Home page
export const fetchClasses = async ({ subType = null, sortBy = "default", limit = null } = {}) => {
  try {
    const response = await axios.get(`${url}/getClasses`, {
      params: { subType, sortBy, limit }
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Class datas: `, error?.message || error);
    return null;
  }
};

// Get Class detail data by ID
export const fetchClassDetailById = async (id) => {
  try {
    const response = await axios.get(`${url}/getClassDetailById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Class detail data by id: ${id}`, error?.message || error);
    return null;
  }
};
