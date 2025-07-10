import axios from "axios";

const url = "http://localhost:5000/users";

// Register User
export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${url}/registerUser`, data);
    return response.data;
  } catch (error) {
    console.error("Register account failed: ", error?.message || error);
    return { error: "Failed to create user" };
  }
};

// Login User
export const loginUser = async (data) => {
  try {
    const response = await axios.get(`${url}/loginUser`, data);
    return response.data;
  } catch (error) {
    console.error(`User not found: `, error?.message || error);
    return { error: "Failed to create user" };
  }
};

// Get all users
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${url}/getUsers`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error?.message || error);
    return [];
  }
};

// Get user by ID
export const fetchUserById = async (id) => {
  try {
    const response = await axios.get(`${url}/getUser/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch user by id: ${id}`, error?.message || error);
    return null;
  }
};

// Create user
export const createUser = async (data) => {
  try {
    const response = await axios.post(`${url}/insertUser`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to create user:", error?.message || error);
    return { error: "Failed to create user" };
  }
};

// Update user
export const updateUser = async (id, updatedData) => {
  try {
    const response = await axios.put(
      `${url}/updateUser/${id}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update user:", error?.message || error);
    return { error: "Failed to update user" };
  }
};

// Delete user
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${url}/deleteUser/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete user:", error?.message || error);
    return { error: "Failed to delete user" };
  }
};
