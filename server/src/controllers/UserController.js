const User = require("../models/UserModel");

// Create user
const insertUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const user = await User.create({ email, password, firstName, lastName });
    res.json(`New user has been successfully added: ${user.firstName}`);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Get user by ID
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).send("User not found");
    res.json(user);
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

    const [updated] = await User.update(
      { email, firstName, lastName },
      { where: { userId: id } }
    );

    if (!updated) return res.status(404).send("User not found");
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
    const deleted = await User.destroy({ where: { userId: id } });
    if (!deleted) return res.status(404).send("User not found");
    res.json("User has been successfully deleted");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  insertUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};