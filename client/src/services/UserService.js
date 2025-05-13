import axios from "axios";

const userUrl = "http://localhost:5000/users/";

// Get all users
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${userUrl}/getUsers`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
};

// Get user by ID
export const fetchUserById = async (userId) => {
  try {
    const response = await axios.get(`${userUrl}/getUser/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch user by id: ${userId}`, error);
    return null;
  }
};

// Create user
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${userUrl}/insertUser`, userData);
    return response.data;
  } catch (error) {
    console.error("Failed to create user:", error);
    return { error: "Failed to create user" };
  }
};

// Update user
export const updateUser = async (userId, updatedData) => {
  try {
    const response = await axios.put(
      `${userUrl}/updateUser/${userId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update user:", error);
    return { error: "Failed to update user" };
  }
};

// Delete user
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${userUrl}/deleteUser/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete user:", error);
    return { error: "Failed to delete user" };
  }
};
