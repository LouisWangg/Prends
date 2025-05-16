const User = require("../models/UserModel");

// Register User
const registerUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const data = await User.findOne({
      where: {
        email: email
      }
    });

    if (data) {
      return res.status(404).send(`User with this email: ${data.email} has already exist!`);
    } else {
      const account = await User.create({ email, password, firstName, lastName });
      res.json(`New user has been successfully added: ${account.firstName}`);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await User.findOne({
      where: {
        email: email,
        password: password
      }
    });
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
    const data = await User.create({ email, password, firstName, lastName });
    res.json(`New user has been successfully added: ${data.firstName}`);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const datas = await User.findAll();
    res.json(datas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Get user by ID
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await User.findByPk(id);
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

    const [data] = await User.update(
      { email, firstName, lastName },
      { where: { userId: id } }
    );

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
    const data = await User.destroy({ where: { userId: id } });
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
  deleteUser,
};