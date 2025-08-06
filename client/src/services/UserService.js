import { api, setAccessToken } from "../api/Axios.js";

const url = "/users";

// Register User
export const registerUser = async (data) => {
  try {
    const response = await api.post(`${url}/registerUser`, data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && !error.response.data.success) 
      return { error: error.response.data.message, success: error.response.data.success };

    return { error: "Gagal dalam proses Register" };
  }
};

// Login User
export const loginUser = async (data) => {
  try {
    const response = await api.post(`${url}/loginUser`, data, {
      withCredentials: true // allows cookie to be set
    });
    setAccessToken(response.data.accessToken); // Save token in memory

    return response.data;
  } catch (error) {
    if (error.response && error.response.data && !error.response.data.success) 
      return { error: error.response.data.message, success: error.response.data.success };

    return { error: "Gagal dalam proses Login" };
  }
};

// Check token whenever refresh page or open in new tab
export const autoCheckLogin = async () => {
  try {
    const response = await api.post(`${url}/refreshToken`, null, {
      withCredentials: true,
    });
    setAccessToken(response.data.accessToken);
    return true;
  } catch (error) {
    return false;
  }
};

// Get all users
export const fetchUsers = async (accessToken) => {
  try {
    const response = await api.get(`${url}/getUsers`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error?.message || error);
    return [];
  }
};

// Get user by ID
export const fetchUserById = async (id) => {
  try {
    const response = await api.get(`${url}/getUser/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch user by id: ${id}`, error?.message || error);
    return null;
  }
};

// Create user
export const createUser = async (data) => {
  try {
    const response = await api.post(`${url}/insertUser`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to create user:", error?.message || error);
    return { error: "Failed to create user" };
  }
};

// Update user
export const updateUser = async (id, updatedData) => {
  try {
    const response = await api.put(
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
    const response = await api.delete(`${url}/deleteUser/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete user:", error?.message || error);
    return { error: "Failed to delete user" };
  }
};
