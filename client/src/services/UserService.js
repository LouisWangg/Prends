const userUrl = "http://localhost:5000/users/";

// Get all users
export const fetchUsers = async () => {
  try {
    const response = await fetch(`${userUrl}/getUsers`);
    if (!response.ok) throw new Error("Failed to fetch users");
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Get user by ID
export const fetchUserById = async (userId) => {
  try {
    const response = await fetch(`${userUrl}/getUser/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch user by id : " + userId);
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Create user
export const createUser = async (userData) => {
  try {
    const response = await fetch(`${userUrl}/insertUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error("Failed to create user");
    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: "Failed to create user" };
  }
};

// Update user
export const updateUser = async (userId, updatedData) => {
  try {
    const response = await fetch(`${userUrl}/updateUser/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) throw new Error("Failed to update user");
    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: "Failed to update user" };
  }
};

// Delete user
export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${userUrl}/deleteUser/${userId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete user");
    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete user" };
  }
};