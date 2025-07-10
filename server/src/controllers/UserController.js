const UserService = require("../services/UserService");

// Register User
const registerUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const result = await UserService.registerUser({ email, password, firstName, lastName });

    if (result.exists) {
      return res.status(404).send(`User with this email: ${result.email} has already exist!`);
    }

    res.json(`New user has been successfully added: ${result.firstName}`);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await UserService.loginUser({ email, password });

    if (!data) return res.status(404).send("User not found");
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Create user
const insertUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const data = await UserService.insertUser({ email, password, firstName, lastName });
    res.json(`New user has been successfully added: ${data.firstName}`);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const datas = await UserService.getUsers();
    res.json(datas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Get user by Id
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await UserService.getUser({ id });

    if (!data) return res.status(404).send("User not found");
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, firstName, lastName } = req.body;

    const [data] = await UserService.updateUser({ id, email, firstName, lastName });

    if (!data) return res.status(404).send("User not found");
    res.json(`User ${id} has been successfully updated`);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await UserService.deleteUser({ id });

    if (!data) return res.status(404).send("User not found");
    res.json("User has been successfully deleted");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  registerUser,
  loginUser,
  insertUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};
