import axios from "axios";

const levelUrl = "http://localhost:5000/levels/";

// Get Level by Title
export const fetchUserById = async (userId) => {
  try {
    const response = await axios.get(`${userUrl}/getUser/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch user by id: ${userId}`, error);
    return null;
  }
};